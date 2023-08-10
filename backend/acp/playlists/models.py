from django.db import models
from accounts.models import UserAccount

# Create your models here.
class Playlist (models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=False)
    song_ids = models.JSONField(default=list)
    no_of_songs = models.IntegerField(default=0)
    image = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    