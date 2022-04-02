import datetime, random, pyotp
import string
from django.core.mail import send_mail
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.serializers import CharField, EmailField, IntegerField
from .serializers import UserSerializer
from .models import User, UserToken, ForgotPassword
from django.contrib.auth.models import User as AUser
from .authentication import JWTAuthentication, create_access_token,create_refresh_token, decode_refresh_token
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse, inline_serializer


class RegisterAPIView (APIView):
    """
    This API provides `create` users via `POST` method.
    """

    @extend_schema(
        tags=['ANA'],
        request=inline_serializer( 
            name='ANA: User Register', 
            fields={ 
                'first_name': CharField(max_length=100),
                'last_name': CharField(max_length=100),
                'email': EmailField(),
                'password': CharField(max_length=100),
                'password_confirm': CharField(max_length=100),
            } 
        ),
        responses={
            201: OpenApiResponse(description='Success Message'),
            400: OpenApiResponse(description='Error Message'),
            500: OpenApiResponse(description='Failed Validation Message'),
        },
    )

    def post(self, request):
        data = request.data

        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Password do not match!')
        
        adminEmails = AUser.objects.filter(is_superuser=True).values_list('email',flat=True)

        url = 'http://localhost:8000/admin/'
        serializer = UserSerializer(data= data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        send_mail(
                subject='New Account Created', 
                message='New user account has been registered, kindly go to the Admin Site to approve or reject => %s' % url,
                from_email='no-reply@vms.nakheel.com',
                recipient_list=adminEmails,
                html_message='New user account has been registered, kindly go to the => <a href="%s">Admin</a> <= Site to approve or reject.'  % url,
        )
        return Response({
            'message': 'New User Added Successfully!'
        })


class LoginAPIView (APIView):
    """
    This API provides `log in` users via `POST` method.
    """
    @extend_schema(
        tags=['ANA'],
        request=inline_serializer( 
            name='ANA: User Login', 
            fields={ 
                'email': EmailField(),
                'password': CharField(max_length=100),
            } 
        ),
        responses={
            201: OpenApiResponse(
                inline_serializer( 
                    name='ANA: Logged In', 
                    fields={ 
                        'id': IntegerField(),
                        'secret': CharField(max_length=100),
                        'otpauth_url': CharField(max_length=512),
                    }
                ),
            ),
            400: OpenApiResponse(description='Error Message'),
            403: OpenApiResponse(description='Invalid Credentials'),
            500: OpenApiResponse(description='System Error'),
        },
    )

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        checkUser = User.objects.filter(email=email).first()


        if checkUser is None:
            raise exceptions.AuthenticationFailed('Invalid Credentials')

        if not checkUser.check_password(password):
            raise exceptions.AuthenticationFailed('Invalid Credentials')

        if checkUser.tfa_secret:
            return Response({
                'id': checkUser.id
            })

        secret = pyotp.random_base32()
        otpauth_url = pyotp.totp.TOTP(secret).provisioning_uri(issuer_name='OTP-'+ checkUser.email)

        return Response({
            'id': checkUser.id,
            'secret': secret,
            'otpauth_url': otpauth_url
        })


class TwoFactorAPIView(APIView):
    """
    This API provides `log in` users with 2FA via `POST` method.
    """
    @extend_schema(
        tags=['ANA'],
        request=inline_serializer( 
            name='ANA: 2FA', 
            fields={ 
                'id': IntegerField(),
                'code': IntegerField(),
            } 
        ),
        responses={
            201: OpenApiResponse(
                inline_serializer( 
                    name='ANA: 2FA OK', 
                    fields={ 
                        'token': CharField(max_length=512),
                    }
                ),
            ),
            400: OpenApiResponse(description='Error Message'),
            403: OpenApiResponse(description='Invalid Credentials'),
            500: OpenApiResponse(description='System Error'),
        },
    )

    def post(self, request):
        id = request.data['id']
        checkUser = User.objects.filter(pk=id).first()

        if checkUser is None:
            raise exceptions.AuthenticationFailed('Invalid Credentials')


        secret = checkUser.tfa_secret if checkUser.tfa_secret !='' else request.data['secret']

        if not pyotp.TOTP(secret).verify(request.data['code']):
            raise exceptions.AuthenticationFailed('Invalid Credentials')

        if checkUser.tfa_secret == '':
            checkUser.tfa_secret = secret
            checkUser.save()

        access_token = create_access_token(id)
        refresh_token = create_refresh_token(id)
        UserToken.objects.create(
            user_id=id,
            token=refresh_token,
            expired_at=datetime.datetime.utcnow() + datetime.timedelta(days=7)
        )
        response= Response()
        response.set_cookie(key='refresh_token',value=refresh_token, httponly=True)
        response.data = {
            'token': access_token
        }
        return response


class get2FACodeAPIView (APIView):
    """
    This API provides `retrieve` QR Codes via `POST` method.
    """
    @extend_schema(
        tags=['ANA'],
        request=inline_serializer( 
            name='ANA: GET QR', 
            fields={ 
                'id': IntegerField(),
            } 
        ),
        responses={
            201: OpenApiResponse(
                inline_serializer( 
                    name='ANA: QR OK', 
                    fields={ 
                        'id': IntegerField(),
                        'otpauth_url': CharField(max_length=512),
                    }
                ),
            ),
            400: OpenApiResponse(description='Error Message'),
            403: OpenApiResponse(description='Invalid Credentials'),
            500: OpenApiResponse(description='System Error'),
        },
    )

    def post(self, request):
        id = request.data['id']
        checkUser = User.objects.filter(pk=id).first()


        if checkUser is None:
            raise exceptions.AuthenticationFailed('Invalid Credentials')

        secret = checkUser.tfa_secret
        otpauth_url = pyotp.totp.TOTP(secret).provisioning_uri(issuer_name='OTP-'+ checkUser.email)

        return Response({
            'id': checkUser.id,
            'otpauth_url': otpauth_url
        })


class RefreshAPIView(APIView):
    """
    This API provides `refresh` token via `POST` method.
    """
    @extend_schema(
        tags=['ANA'],
        parameters=[
                OpenApiParameter(
                    name='Token',
                    location=OpenApiParameter.COOKIE,
                    description='Header Cookie',
                ),
        ],
        responses={
            201: OpenApiResponse(
                inline_serializer( 
                    name='ANA: REFRESH TOKEN', 
                    fields={ 
                        'refresh_token': CharField(max_length=512),
                    }
                ),
            ),
            400: OpenApiResponse(description='Error Message'),
            403: OpenApiResponse(description='Unauthenticated'),
            500: OpenApiResponse(description='System Error'),
        },
    )

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)

        if not UserToken.objects.filter(
            user_id=id,
            token=refresh_token,
            expired_at__gt=datetime.datetime.now(tz=datetime.timezone.utc)
        ).exists():
            raise exceptions.AuthenticationFailed('Unauthenticated')

        access_token =create_access_token(id)

        return Response({
            'token': access_token
        })


class ForgotPasswordView(APIView):
    """
    This API provides `request` url code for password reset via `POST` method.
    """
    @extend_schema(
        tags=['ANA'],
        request=inline_serializer( 
            name='ANA: Forgot Password', 
            fields={ 
                'email': EmailField(),
            } 
        ),
        responses={
            201: OpenApiResponse(description='Success Message'),
            400: OpenApiResponse(description='Error Message'),
            500: OpenApiResponse(description='System Error'),
        },
    )

    def post(self, request):
        email = request.data['email']
        token = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(10))

        ForgotPassword.objects.create(
            email=request.data['email'],
            token=token
        )

        url = 'http://localhost:4200/reset/' + token

        send_mail(
                subject='Reset Your Password', 
                message='You have requested to reset your password, to do this click on the following link => %s' % url,
                from_email='admin@bi.tools.nakheel.com',
                recipient_list=[email],
                html_message='You have requested to reset your password, to do this click => <a href="%s">here</a>' % url,
        )

        return Response({
            'message': 'Password reset request sent!'
        })

class ResetPasswordView(APIView):
    """
    This API provides `reset` passwords users via `POST` method.
    """
    @extend_schema(
        tags=['ANA'],
        request=inline_serializer( 
            name='ANA: Reset Password', 
            fields={ 
                'password': CharField(max_length=100),
                'password_confirm': CharField(max_length=100),
            } 
        ),
        responses={
            201: OpenApiResponse(description='Success Message'),
            400: OpenApiResponse(description='Error Message'),
            500: OpenApiResponse(description='System Error'),
        },
    )

    def post(self, request):
        data = request.data

        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Password do not match!')

        reset_password = ForgotPassword.objects.filter(token=data['token']).first()

        if not reset_password:
            raise exceptions.APIException('Invalid Link (URL)')

        checkUser = User.objects.filter(email=reset_password.email).first()

        if not checkUser:
            raise exceptions.APIException('User not found!')


        checkUser.set_password(data['password'])
        checkUser.save(update_fields=['password'])


        return Response({
            'message': 'Password reset successful!'
        })


class LogOutAPIView(APIView):
    """
    This API provides `log out` users via `POST` method.
    """
    @extend_schema(
        tags=['ANA'],
        parameters=[
                OpenApiParameter(
                    name='Token',
                    location=OpenApiParameter.COOKIE,
                    description='Header Cookie',
                ),
        ],
        responses={
            201: OpenApiResponse(description='Success Message'),
            400: OpenApiResponse(description='Error Message'),
            500: OpenApiResponse(description='System Error'),
        },
    )

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        UserToken.objects.filter(token=refresh_token).delete

        response = Response()
        response.delete_cookie(key='refresh_token')
        response.data = {
            'message': 'log out successful!'
        }

        return response


class UserAPIView(APIView):
    """
    This API provides `retrieve` user information via `GET` method.  Requires authenticated user.
    """
    authentication_classes = [JWTAuthentication]

    @extend_schema(
        tags=['ANA'],
        responses={
            201: UserSerializer,
            400: OpenApiResponse(description='Error Message'),
            403: OpenApiResponse(description='Unauthenticated'),
            500: OpenApiResponse(description='System Error'),
        },
    )

    def get(self,request):
        return Response(UserSerializer(request.user).data)