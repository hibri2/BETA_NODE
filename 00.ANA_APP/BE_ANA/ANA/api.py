import datetime, random, pyotp
import email
import string
from django.core.mail import send_mail
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ANA_UserSerializer
from .models import ANA_User, ANA_UserToken, ANA_ForgotPassword
from django.contrib.auth.models import User
from .authentication import JWTAuthentication, create_access_token,create_refresh_token, decode_refresh_token


class RegisterAPIView (APIView):
    def post(self, request):
        data = request.data

        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Password do not match!')
        
        adminEmails = User.objects.filter(is_superuser=True).values_list('email',flat=True)

        url = 'http://localhost:8000/admin/'
        serializer = ANA_UserSerializer(data= data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        send_mail(
                subject='New Account Created', 
                message='New user account has been registered, kindly go to the Admin Site to approve or reject => %s' % url,
                from_email='admin@bi.tools.nakheel.com',
                recipient_list=adminEmails,
                html_message='New user account has been registered, kindly go to the => <a href="%s">Admin</a> <= Site to approve or reject.'  % url,
        )
        return Response({
            'message': 'New User Added Successfully!'
        })


class LoginAPIView (APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        checkUser = ANA_User.objects.filter(email=email).first()


        if checkUser is None:
            raise exceptions.AuthenticationFailed('Invalid Credentials')

        if not checkUser.check_password(password):
            raise exceptions.AuthenticationFailed('Invalid Credentials')

        if checkUser.tfa_secret:
            return Response({
                'id': checkUser.id
            })

        secret = pyotp.random_base32()
        otpauth_url = pyotp.totp.TOTP(secret).provisioning_uri(issuer_name='ANA_OTP-'+ checkUser.email)

        return Response({
            'id': checkUser.id,
            'secret': secret,
            'otpauth_url': otpauth_url
        })


class TwoFactorAPIView(APIView):
    def post(self, request):
        id = request.data['id']
        checkUser = ANA_User.objects.filter(pk=id).first()

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
        ANA_UserToken.objects.create(
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
    def post(self, request):
        id = request.data['id']
        checkUser = ANA_User.objects.filter(pk=id).first()


        if checkUser is None:
            raise exceptions.AuthenticationFailed('Invalid Credentials')

        secret = checkUser.tfa_secret

        if not checkUser.check_password(request.data['password']):
            raise exceptions.AuthenticationFailed('Invalid Credentials')

        otpauth_url = pyotp.totp.TOTP(secret).provisioning_uri(issuer_name='ANA_OTP-'+ checkUser.email)

        return Response({
            'id': checkUser.id,
            'otpauth_url': otpauth_url
        })


class UserAPIView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self,request):
        return Response(ANA_UserSerializer(request.user).data)


class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)

        if not ANA_UserToken.objects.filter(
            user_id=id,
            token=refresh_token,
            expired_at__gt=datetime.datetime.now(tz=datetime.timezone.utc)
        ).exists():
            raise exceptions.AuthenticationFailed('Unauthenticated')

        access_token =create_access_token(id)

        return Response({
            'token': access_token
        })


class LogOutAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        ANA_UserToken.objects.filter(token=refresh_token).delete

        response = Response()
        response.delete_cookie(key='refresh_token')
        response.data = {
            'message': 'log out successful!'
        }

        return response


class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data['email']
        token = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(10))

        ANA_ForgotPassword.objects.create(
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
    def post(self, request):
        data = request.data

        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Password do not match!')

        reset_password = ANA_ForgotPassword.objects.filter(token=data['token']).first()

        if not reset_password:
            raise exceptions.APIException('Invalid Link (URL)')

        checkUser = ANA_User.objects.filter(email=reset_password.email).first()

        if not checkUser:
            raise exceptions.APIException('User not found!')


        checkUser.set_password(data['password'])
        checkUser.save(update_fields=['password'])


        return Response({
            'message': 'Password reset successful!'
        })