# Generated by Django 4.0.3 on 2023-03-17 18:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='spotifytoken',
            name='user',
        ),
        migrations.AddField(
            model_name='spotifytoken',
            name='account',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
