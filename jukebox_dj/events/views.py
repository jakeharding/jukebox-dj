"""
views.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

ViewSet for events.
"""


from rest_framework.viewsets import ModelViewSet
from rest_framework.serializers import ModelSerializer, SlugRelatedField

from .models import Event
from jukebox_dj.users.models import DjProfile
from jukebox_dj.songs.views import SongListSerializer, NestedSongRequestSerializer


class EventSerializer(ModelSerializer):
    dj = SlugRelatedField(
        queryset=DjProfile.objects.all(),
        slug_field='dj_id'
    )

    song_lists = SongListSerializer(many=True, read_only=True)
    song_requests = NestedSongRequestSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        exclude = ['id', ]
        lookup_field = 'uuid'


class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'uuid'
    filter_fields = ('dj_id', 'is_active', 'dj__user__uuid', )
