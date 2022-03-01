# Generated by Django 4.0.2 on 2022-02-27 08:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ANA', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ForgotPassword',
            new_name='ANA_ForgotPassword',
        ),
        migrations.RenameModel(
            old_name='User',
            new_name='ANA_User',
        ),
        migrations.RenameModel(
            old_name='UserToken',
            new_name='ANA_UserToken',
        ),
        migrations.AlterModelOptions(
            name='ana_forgotpassword',
            options={'ordering': ['id'], 'verbose_name': '03.ANA->Reset Password Request', 'verbose_name_plural': '03.ANA->Reset Password Requests'},
        ),
        migrations.AlterModelOptions(
            name='ana_user',
            options={'ordering': ['id'], 'verbose_name': '01.ANA->User', 'verbose_name_plural': '01.ANA->Users'},
        ),
        migrations.AlterModelOptions(
            name='ana_usertoken',
            options={'ordering': ['user_id'], 'verbose_name': '02.ANA->Token', 'verbose_name_plural': '02.ANA->Tokens'},
        ),
    ]
