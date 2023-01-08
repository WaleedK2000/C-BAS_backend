from django.urls import path
from . import views

urlpatterns = [
    path('running_containers', views.getData),
    path('execute', views.executeExploit),
]
