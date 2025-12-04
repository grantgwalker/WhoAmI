from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.get_profile, name='get_profile'),
    path('projects/', views.get_projects, name='get_projects'),
]
