from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class ANA_User(AbstractBaseUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)
    tfa_secret = models.CharField(max_length=255, default='')
    username = None
    last_login = None
    is_superuser = None
    is_staff = None
    date_joined = None


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'password']
    

    class Meta:
        ordering = ['id',]
        verbose_name = "01.ANA->User"
        verbose_name_plural = "01.ANA->Users"

    def __str__(self):
        return self.email


class ANA_UserToken(models.Model):
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


class ANA_ForgotPassword(models.Model):
    email = models.CharField(max_length=255)
    token = models.CharField(max_length=255, unique=True)

    class Meta:
        ordering = ['id',]
        verbose_name = "03.ANA->Reset Password Request"
        verbose_name_plural = "03.ANA->Reset Password Requests"

    def __str__(self):
        return self.email