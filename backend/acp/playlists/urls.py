from django.urls import include, path, re_path
from rest_framework import routers
from . import views

app_name = 'playlists'
router = routers.DefaultRouter()

urlpatterns = [ 
    re_path(r'playlists', views.playlist_list),
    path('', include(router.urls)),
]