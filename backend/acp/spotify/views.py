from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import update_or_create_user_tokens, is_spotify_authenticated
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.
class AuthURL(APIView):
    def get (self, request, format =None):
        scopes = 'user-read-email user-library-modify playlist-read-private playlist-modify-public playlist-modify-private user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming user-read-recently-played user-top-read user-follow-read'
        
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
                'scope': scopes,
                'response_type': 'code',
                'redirect_uri': REDIRECT_URI,
                'client_id':CLIENT_ID
            }).prepare().url
        
        return Response ({'url': url}, status = status.HTTP_200_OK)
    
def spotify_callback(request, format = None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')
    
    user = request.query_params.get('user', None)
    if user is not None:
        accObj = User.objects.get(id = user)
        update_or_create_user_tokens(user, access_token, refresh_token, token_type, expires_in)

        return(redirect('http://localhost:3000'))
    

class IsAuthenticated(APIView):
    def get(self, request, format = None):
        user = self.request.query_params.get('user', None)
        is_authenticated = is_spotify_authenticated(user)
        return Response({'Status': is_authenticated}, status=status.HTTP_200_OK)
# SCOPES = ['user-read-email', 
#             'user-library-read', 
#             'user-library-modify', 
#             'playlist-read-private', 
#             'playlist-modify-public', 'playlist-modify-private', 
#             'user-read-private', 'user-read-playback-state', 
#             'user-modify-playback-state', 'user-read-currently-playing', 
#             'app-remote-control', 'streaming', 'user-read-recently-played', 
#             'user-top-read', 'user-follow-read']