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
    dj = m.ForeignKey('users.DjProfile', related_name="songs")
    song_lists = m.ManyToManyField('songs.SongList', blank=True, related_name="songs")

    def __str__(self):
        return self.title


class SongList(m.Model):
    uuid = m.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    name = m.CharField(max_length=255)
    description = m.TextField(blank=True, null=True)
    dj = m.ForeignKey('users.DjProfile', related_name="song_lists")
    created_at = m.DateTimeField(auto_now_add=True)
    events = m.ManyToManyField('events.Event', blank=True, related_name="song_lists")

    def __str__(self):
        return self.name


class SongRequest(m.Model):

    REQUESTED_STATUS = 0
    QUEUED_STATUS = 1
    DENIED_STATUS = 2
    PLAYED_STATUS = 3
    STATUS_CHOICES = (
        (REQUESTED_STATUS, "Requested"),
        (QUEUED_STATUS, "Queued"),
        (DENIED_STATUS, "Denied"),
        (PLAYED_STATUS, "Played"),
    )

    uuid = m.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    song = m.ForeignKey('songs.Song', related_name="song_requests")
    requester_name = m.CharField(max_length=255, blank=True, null=True)
    message = m.CharField(max_length=255, blank=True, null=True)
    created_at = m.DateTimeField(auto_now_add=True)
    event = m.ForeignKey('events.Event', related_name="song_requests")
    status = m.SmallIntegerField(choices=STATUS_CHOICES, default=REQUESTED_STATUS)
    cookie = m.ForeignKey('songs.SongRequestCookie', related_name='song_requests')

    def __str__(self):
        return "Request for %s at %s" % (self.song.title, self.event.name)


class SongRequestCookie(m.Model):
    uuid = m.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    user = m.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True, related_name='song_request_cookies')
    created_at = m.DateTimeField(auto_now_add=True)


class Category(m.Model):
    uuid = m.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    name = m.CharField(max_length=255)
    songs = m.ManyToManyField('songs.Song', blank=True, related_name="categories")
    song_lists = m.ManyToManyField('songs.SongList', blank=True, related_name="categories")
    created_at = m.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
