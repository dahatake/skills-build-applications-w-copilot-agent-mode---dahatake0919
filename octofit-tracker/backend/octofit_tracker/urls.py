"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
import os
from django.http import JsonResponse
from rest_framework.routers import DefaultRouter
from .views import (
    api_root,
    TeamViewSet,
    UserViewSet,
    ActivityViewSet,
    WorkoutViewSet,
    LeaderboardViewSet,
)

router = DefaultRouter()
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'users', UserViewSet, basename='user')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'workouts', WorkoutViewSet, basename='workout')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')

def dynamic_api_root(request):
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        base = f"https://{codespace_name}-8000.app.github.dev"
    else:
        # fallback to request scheme/host (localhost access)
        base = f"{request.scheme}://{request.get_host()}".rstrip('/')
    api_base = f"{base}/api"
    return JsonResponse({
        'users': f"{api_base}/users/",
        'teams': f"{api_base}/teams/",
        'activities': f"{api_base}/activities/",
        'workouts': f"{api_base}/workouts/",
        'leaderboard': f"{api_base}/leaderboard/",
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', dynamic_api_root, name='api-root'),
]
