from django.urls import include, path
from rest_framework import routers
from . import views

app_name='accounts'
router = routers.DefaultRouter()
router.register(r'accounts', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]