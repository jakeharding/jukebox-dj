"""
views.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Will hold the ViewSets and Serializers for songs.
"""


from rest_framework.serializers import ModelSerializer

from jukebox_dj.songs.models import SongList, Song, SongRequest


class SongSerializer(ModelSerializer):

    class Meta:
        model = Song
        exclude = ['id', 'dj', 'song_lists', ]


class SongListSerializer(ModelSerializer):

    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = SongList
        exclude = ['id', 'dj', 'events', ]


class SongRequestSerializer(ModelSerializer):

    song = SongSerializer()

    class Meta:
        model = SongRequest
        exclude = ['id', 'event', ]
