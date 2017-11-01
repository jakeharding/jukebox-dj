"""
views.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Will hold the ViewSets and Serializers for songs.
"""
import datetime
from django_filters import Filter
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer, SlugRelatedField, SerializerMethodField
from rest_framework.viewsets import ModelViewSet

from jukebox_dj.songs.models import SongList, Song, SongRequest, SongRequestCookie
from jukebox_dj.events.models import Event


class SongSerializer(ModelSerializer):

    class Meta:
        model = Song
        exclude = ['id', 'dj', 'song_lists', ]


class SongListSerializer(ModelSerializer):

    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = SongList
        exclude = ['id', 'dj', 'events', ]


class NestedSongRequestSerializer(ModelSerializer):
    """This serializer is nested in the event response."""

    song = SongSerializer()
    cookie = SlugRelatedField(
        queryset=SongRequestCookie.objects.all(),
        slug_field='uuid'
    )

    class Meta:
        model = SongRequest
        exclude = ['id', 'event', ]


class StandAloneSongRequestSerializer(ModelSerializer):
    """This serializer is not nested and for the song request endpoint."""
    song = SlugRelatedField(
        queryset=Song.objects.all(),
        slug_field='uuid'
    )
    event = SlugRelatedField(
        queryset=Event.objects.all(),
        slug_field='uuid'
    )
    cookie = SlugRelatedField(
        queryset=SongRequestCookie.objects.all(),
        slug_field='uuid'
    )

    song_title = SerializerMethodField()
    song_artist = SerializerMethodField()

    def get_song_title(self, song_request):
        return song_request.song.title

    def get_song_artist(self, song_request):
        return song_request.song.artist

    class Meta:
        model = SongRequest
        exclude = ['id', ]


class SongRequestViewset(ModelViewSet):
    queryset = SongRequest.objects.filter()
    serializer_class = StandAloneSongRequestSerializer
    lookup_field = 'uuid'
    filter_fields = ('event__uuid', 'status', 'song__uuid', 'cookie__uuid')

    def create(self, request, *args, **kwargs):
        """Override the create method to prevent recent requests to same song."""

        song_uuid = request.data.get('song')

        if SongRequest.objects.filter(
                        Q(song__uuid=song_uuid) &
                        Q(created_at__gte=datetime.datetime.utcnow() - datetime.timedelta(hours=1))).exists():
            return Response(status=409, data={
                "error": "Request for this song has been made within the last hour.",
                "song_uuid": song_uuid
            })

        return super(SongRequestViewset, self).create(request, args, kwargs)

class SongEventFilter(DjangoFilterBackend):
    def filter_queryset(self, request, qs, view):
        event_uuid = request.query_params.get("event")
        if not event_uuid:
            return qs
        return qs.filter(song_lists__events__uuid=request.query_params.get("event"))

class SongViewset(ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    lookup_field = 'uuid'
    filter_backends = (SongEventFilter, DjangoFilterBackend)
