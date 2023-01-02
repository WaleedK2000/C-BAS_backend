from django.urls import path
from . import views

urlpatterns = [
    path('docker/running_containers', views.getData),
]
