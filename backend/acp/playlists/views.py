import random
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from .serializers import PlaylistSerializer
from .models import Playlist
from django.contrib.auth import get_user_model
from accounts.models import UserAccount

User = get_user_model()
# Create your views here.

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def playlist_list(request):
    
    if request.method == 'GET':
        user = request.query_params.get('user', None)
        worldPlaylists = request.query_params.get('world')
        if user is not None:
            accObj = User.objects.get(id = user)
            items = Playlist.objects.filter (account = accObj)
            serializer = PlaylistSerializer(items, many=True, context = {'request': None})
            return JsonResponse(serializer.data, safe=False)
        elif worldPlaylists == 'yes':
            # permission_classes = [AllowAny]
            items = Playlist.objects.all()
            items = random.sample(list(items), min(len(items), 8))
            serializer = PlaylistSerializer(items, many=True, context = {'request': None})
            return JsonResponse(serializer.data, safe=False)
        else:
            return JsonResponse({'message': 'GET requests must contain a user ID'},
                                status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        user = data.get('user')
        userObj = User.objects.get(id=user)
        name = data.get('name')
        location = data.get('location')
        songIds = data.get('songIds')
        no_of_songs = data.get('no_of_songs')
        image = data.get('coverImage')

        post = Playlist.objects.create(
                                       name =name,
                                       location = location,
                                       account=userObj,
                                       song_ids = songIds,
                                       no_of_songs = no_of_songs,
                                       image = image)
        post.save()
        data['id'] = post.id
        serializer = PlaylistSerializer(post, data=data)
    
        return JsonResponse(serializer.initial_data, status=status.HTTP_201_CREATED)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        id = data.get('id')
        songIds = data.get('songIds')
        no_of_songs = data.get('no_of_songs')

        put = Playlist.objects.update_or_create(id = id,
                                                defaults={'song_ids': songIds,
                                                          'no_of_songs': no_of_songs})
        put[0].save()
        serializer = PlaylistSerializer(put, data=data)
        return JsonResponse(serializer.initial_data)
    
    elif request.method == 'DELETE':
        id = request.query_params.get('id', None)
        try:
            if id is not None:
                item = Playlist.objects.get(id=id)
                item.delete()
                return JsonResponse({'message': 'Playlist deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return JsonResponse({'message': 'Request did not contain ID'}, status=status.HTTP_400_BAD_REQUEST)

        except Playlist.DoesNotExist:
            return JsonResponse({'message': 'Bucket List Item not found'}, status=status.HTTP_404_NOT_FOUND)

        
        # if serializer.is_valid():
        #     serializer.save(account=accObj)
        #     return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        # return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

        