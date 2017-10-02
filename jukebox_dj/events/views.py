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
from jukebox_dj.users.models import JukeboxUser
from jukebox_dj.songs.views import SongListSerializer, NestedSongRequestSerializer


class EventSerializer(ModelSerializer):
    dj = SlugRelatedField(
        queryset=JukeboxUser.objects.filter(djprofile__isnull=False),
        slug_field='uuid'
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
    filter_fields = ('dj__djprofile__dj_id', 'is_active', 'dj__uuid', )
