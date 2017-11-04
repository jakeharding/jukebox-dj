"""jukebox_dj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.conf import settings
from django.contrib import admin

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from jukebox_dj.index.views import IndexView
from jukebox_dj.events.views import EventViewSet
from jukebox_dj.songs.views import SongRequestViewset, SongViewset

router = DefaultRouter(trailing_slash=False)
router.register('events', EventViewSet)
router.register('song-requests', SongRequestViewset)
router.register('songs', SongViewset)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', IndexView.as_view()),
    url(r'^api/%s/' % settings.REST_API_VERSION, include(router.urls)),
    url(r'^api/%s/login$' % settings.REST_API_VERSION, obtain_auth_token),
]
