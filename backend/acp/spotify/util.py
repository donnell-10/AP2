from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .views import CLIENT_ID, CLIENT_SECRET
from requests import post

def get_user_tokens(account):
    user_tokens = SpotifyToken.objects.filter(account=account)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

def update_or_create_user_tokens (account, access_token, refresh_token, token_type, expires_in):
    tokens = get_user_tokens(account)
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    
    if tokens:
        tokens.access_token= access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])

    else:
        tokens = SpotifyToken(account=account, access_token=access_token, refresh_token = refresh_token, token_type = token_type, expires_in = expires_in)
        tokens.save()

def is_spotify_authenticated(account):
    tokens = get_user_tokens(account)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(account)
        
        return True
    return False

def refresh_spotify_token(account):
    refresh_token = get_user_tokens(account).refresh_token
    repsonse = post('https://accounts.spotify.com/api/token', data ={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = repsonse.get('access_token')
    token_type = repsonse.get('token_type')
    expires_in = repsonse.get('expires_in')
    refresh_token = repsonse.get('refresh_token')

    update_or_create_user_tokens(account, access_token, refresh_token, token_type, expires_in )