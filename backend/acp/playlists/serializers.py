from rest_framework import serializers
from .models import Playlist

class PlaylistSerializer(serializers.ModelSerializer):
    user = serializers.HyperlinkedIdentityField(view_name="accounts:useraccount-detail")
    class Meta:
        model = Playlist
        fields = ('id', 'name', 'location', 'user', 'song_ids', 'no_of_songs', 'image', 'created_at')
        read_only_fields = ('id', 'created_at')