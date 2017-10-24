"""
tests.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Tests related to songs and requests.
"""

import json
from unittest.mock import Mock

from django.http import HttpRequest, HttpResponse
from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from rest_framework.status import is_success

from jukebox_dj.events.tests import RestApiTestCaseMixin
from jukebox_dj.songs.models import SongRequest, SongRequestCookie
from jukebox_dj.songs.middleware import SongRequestMiddleware
from jukebox_dj.users.models import DjProfile


class TestSongRequestRest(APITestCase, RestApiTestCaseMixin):
    fixtures = ['jukebox_dj/users/fixtures/users.json', 'jukebox_dj/events/fixtures/events.json',
                'jukebox_dj/songs/fixtures/songs.json', 'jukebox_dj/songs/fixtures/song_lists.json',
                'jukebox_dj/songs/fixtures/requests.json',
                ]
    list_url_name = "songrequest-list"
    detail_url_name = "songrequest-detail"
    model_under_test = SongRequest
    test_object = None

    def setUp(self):
        self.test_object = SongRequest.objects.first()

    def test_create(self):
        new_obj = {
            "song": "a8d00a30-24cc-405b-b0a5-67b350063e28",
            "requester_name": "Some dude",
            "message": "this one goes out to the homies",
            "event": "282121e2-bd4a-4b43-b070-f376413f1082",
            "cookie": "ca9620a2-a40b-4efd-bcf8-5f7951d4e57d",
        }
        r = self.client.post(reverse(self.list_url_name), json.dumps(new_obj), content_type='application/json')
        self.assertTrue(is_success(r.status_code), r.status_code)

    def test_update(self):
        update_obj = {
            "song": "a8d00a30-24cc-405b-b0a5-67b350063e28",
            "requester_name": "Some dude",
            "message": "this one goes out to the homies",
            "event": "282121e2-bd4a-4b43-b070-f376413f1082",
            "status": SongRequest.PLAYED_STATUS,
            "cookie": "ca9620a2-a40b-4efd-bcf8-5f7951d4e57d",

        }
        r = self.client.put(reverse(self.detail_url_name, args=[self.test_object.uuid]), update_obj)
        self.assertTrue(is_success(r.status_code), r.data)

    def test_partial_update(self):
        status_only = {
            "status": SongRequest.DENIED_STATUS
        }
        r = self.client.patch(reverse(self.detail_url_name, args=[self.test_object.uuid]), status_only)
        self.assertTrue(is_success(r.status_code), r.data)


class TestCustomMiddleware(TestCase):

    fixtures = ['jukebox_dj/users/fixtures/users.json']

    def setUp(self):
        self.r = HttpRequest()
        self.mock_res = HttpResponse()
        self.mock_res.set_cookie = Mock()
        self.mock_get_response = Mock(return_value=self.mock_res)
        self.mid = SongRequestMiddleware(self.mock_get_response)

    def testMiddlewareWithCookie(self):
        self.r.COOKIES['song_request'] = 'COOKIESET'
        self.mid(self.r)
        self.mock_get_response.assert_called_once_with(self.r)
        self.mock_res.set_cookie.assert_called_once_with(self.mid.COOKIE_STRING, 'COOKIESET', max_age=self.mid.MAX_AGE)

    def testMiddleWareWithoutCookie(self):
        user = DjProfile.objects.first().user
        self.r.user = user
        self.mid(self.r)
        new_cookie = SongRequestCookie.objects.order_by('-created_at').first()
        self.assertTrue(new_cookie.user == user)
        self.mock_get_response.assert_called_once_with(self.r)
        self.mock_res.set_cookie.assert_called_once_with(self.mid.COOKIE_STRING, new_cookie.uuid, max_age=self.mid.MAX_AGE)




