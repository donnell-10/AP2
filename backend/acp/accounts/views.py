from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import UserCreateSerializer
from .models import UserAccount

class UserViewSet(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all().order_by('email')
    serializer_class = UserCreateSerializer