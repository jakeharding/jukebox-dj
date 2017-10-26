"""
views.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

ViewSet for events.
"""


from _datetime import datetime, timedelta

from django.db.models import Q
from rest_framework.viewsets import ModelViewSet
from rest_framework.serializers import ModelSerializer, SlugRelatedField, SerializerMethodField

from .models import Event
from jukebox_dj.users.models import DjProfile
from jukebox_dj.songs.views import SongListSerializer, NestedSongRequestSerializer, SongSerializer
from jukebox_dj.songs.models import Song


class EventSerializer(ModelSerializer):
    dj = SlugRelatedField(
        queryset=DjProfile.objects.all(),
        slug_field='dj_id'
    )

    song_lists = SongListSerializer(many=True, read_only=True)
    song_requests = NestedSongRequestSerializer(many=True, read_only=True)
    songs = SerializerMethodField()

    def get_songs(self, event):
        one_hour_ago = datetime.utcnow() - timedelta(hours=1)
        song_list_ids = event.song_lists.values_list('id', flat=True)
        return SongSerializer(Song.objects.filter(
            song_lists__id__in=song_list_ids).exclude(
            song_requests__created_at__gte=one_hour_ago).distinct(), many=True).data

    class Meta:
        model = Event
        exclude = ['id', ]
        lookup_field = 'uuid'


class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'uuid'
    filter_fields = ('dj_id', 'is_active', 'dj__user__uuid', )
