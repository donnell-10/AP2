from django.db import models
from accounts.models import UserAccount

# Create your models here.
class SpotifyToken(models.Model):
    
    account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

