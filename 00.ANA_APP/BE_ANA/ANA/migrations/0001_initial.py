# Generated by Django 4.0.3 on 2022-04-08 05:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ForgotPassword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=255)),
                ('token', models.CharField(max_length=255, unique=True)),
            ],
            options={
                'verbose_name': '03.ANA->Reset Password Request',
                'verbose_name_plural': '03.ANA->Reset Password Requests',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('tfa_secret', models.CharField(default='', max_length=255)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_login', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': '01.ANA->User',
                'verbose_name_plural': '01.ANA->Users',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='UserToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('token', models.CharField(max_length=255)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('expired_at', models.DateField()),
            ],
            options={
                'verbose_name': '02.ANA->Token',
                'verbose_name_plural': '02.ANA->Tokens',
                'ordering': ['user_id'],
            },
        ),
    ]
