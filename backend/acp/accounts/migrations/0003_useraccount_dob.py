# Generated by Django 4.0.3 on 2023-03-04 14:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_remove_useraccount_dob'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='dob',
            field=models.DateField(null=True),
        ),
    ]