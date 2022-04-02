from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class User(AbstractBaseUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    tfa_secret = models.CharField(max_length=255, default='')
    created_on = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=False)
    username = None
    is_superuser = None
    is_staff = None


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'password']
    

    class Meta:
        ordering = ['id',]
        verbose_name = "01.ANA->User"
        verbose_name_plural = "01.ANA->Users"

    def __str__(self):
        return self.email


class UserToken(models.Model):
    user_id = models.IntegerField()
    token = models.CharField(max_length=255)
    create_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateField()

    class Meta:
        ordering = ['user_id',]
        verbose_name = "02.ANA->Token"
        verbose_name_plural = "02.ANA->Tokens"

    def __str__(self):
        return self.user_id


class ForgotPassword(models.Model):
    email = models.CharField(max_length=255)
    token = models.CharField(max_length=255, unique=True)

    class Meta:
        ordering = ['id',]
        verbose_name = "03.ANA->Reset Password Request"
        verbose_name_plural = "03.ANA->Reset Password Requests"

    def __str__(self):
        return self.email