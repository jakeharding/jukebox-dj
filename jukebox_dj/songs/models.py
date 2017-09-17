"""
models.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Song models
"""


import uuid

from django.conf import settings
from django.db import models as m


class Song(m.Model):
    uuid = m.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    title = m.CharField(max_length=255)
    artist = m.CharField(max_length=255)
    description = m.TextField(blank=True, null=True)
    created_at = m.DateTimeField(auto_now_add=True)
    dj = m.ForeignKey(settings.AUTH_USER_MODEL)
    song_list = m.ForeignKey('songs.SongList', blank=True, null=True)


class SongList(m.Model):
    uuid = m.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    name = m.CharField(max_length=255)
    description = m.TextField(blank=True, null=True)
    dj = m.ForeignKey(settings.AUTH_USER_MODEL)
    created_at = m.DateTimeField(auto_now_add=True)
    event = m.ForeignKey('events.Event', blank=True, null=True)


class SongRequest(m.Model):
    uuid = m.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    song = m.ForeignKey('songs.Song')
    requester_name = m.CharField(max_length=255, blank=True, null=True)
    message = m.CharField(max_length=255, blank=True, null=True)
    created_at = m.DateTimeField(auto_now_add=True)
    event = m.ForeignKey('events.Event')


class Category(m.Model):
    uuid = m.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    name = m.CharField(max_length=255)
    song = m.ForeignKey('songs.Song', blank=True, null=True)
    song_list = m.ForeignKey('songs.SongList', blank=True, null=True)
    created_at = m.DateTimeField(auto_now_add=True)
