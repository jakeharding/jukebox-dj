"""
middleware.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Middleware to set the song request cookie
"""
from django.http import HttpResponse, HttpRequest

from jukebox_dj.songs.models import SongRequestCookie


class SongRequestMiddleware(object):

    MAX_AGE = 24 * 60 * 60  # Seconds in 24 hours
    COOKIE_STRING = 'song_request'

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request, *args, **kwargs):
        cookie = request.COOKIES.get(self.COOKIE_STRING)
        if not cookie:
            new_cookie = SongRequestCookie.objects.create()
            if request.user.is_authenticated():
                new_cookie.user = request.user
                new_cookie.save()
            cookie = new_cookie.uuid

        response = self.get_response(request)
        response.set_cookie(self.COOKIE_STRING, cookie, max_age=self.MAX_AGE)
        return response
