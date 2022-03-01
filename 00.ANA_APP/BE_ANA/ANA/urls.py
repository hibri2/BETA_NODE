from django.urls import path
from .api import (
    ForgotPasswordView,
    LogOutAPIView, 
    RegisterAPIView, 
    LoginAPIView,
    ResetPasswordView,
    TwoFactorAPIView,
    UserAPIView, 
    RefreshAPIView
)


urlpatterns = [
    path('register', RegisterAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
    path('two-factor', TwoFactorAPIView.as_view()),
    path('user', UserAPIView.as_view()),
    path('refresh', RefreshAPIView.as_view()),
    path('logout', LogOutAPIView.as_view()),
    path('forgotpassword', ForgotPasswordView.as_view()),
    path('resetpassword', ResetPasswordView.as_view())
]