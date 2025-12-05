from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.get_profile, name='get_profile'),
    path('experience/', views.get_experience, name='get_experience'),
    path('projects/', views.get_projects, name='get_projects'),
]
