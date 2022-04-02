from django.contrib import admin
from .models import User, UserToken, ForgotPassword


class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'first_name', 
        'last_name', 
        'email',
        'created_on',
        'last_login',
        'is_active',
    )
    exclude = ('password','tfa_secret',)


class UserTokenAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user_id', 
        'token', 
        'create_at', 
        'expired_at'
        )


class ForgotPasswordAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'email', 
        'token'
        )

admin.site.register(User, UserAdmin)
admin.site.register(UserToken, UserTokenAdmin)
admin.site.register(ForgotPassword, ForgotPasswordAdmin)
