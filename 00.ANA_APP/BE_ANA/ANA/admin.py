from django.contrib import admin
from .models import ANA_User, ANA_UserToken, ANA_ForgotPassword


class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'first_name', 
        'last_name', 
        'email',
        'is_active'
    )
    exclude = ('password',)


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

admin.site.register(ANA_User, UserAdmin)
admin.site.register(ANA_UserToken, UserTokenAdmin)
admin.site.register(ANA_ForgotPassword, ForgotPasswordAdmin)
