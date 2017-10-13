"""
tests.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Tests related to songs and requests.
"""


from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from rest_framework.status import HTTP_200_OK, is_success

from jukebox_dj.events.tests import RestApiTestCaseMixin, RestApiTestException
from jukebox_dj.songs.models import SongRequest


class TestSongRequestRest(APITestCase, RestApiTestCaseMixin):
    fixtures = ['jukebox_dj/users/fixtures/users.json', 'jukebox_dj/events/fixtures/events.json',
                'jukebox_dj/songs/fixtures/songs.json', 'jukebox_dj/songs/fixtures/song_lists.json',
                'jukebox_dj/songs/fixtures/requests.json', 'jukebox_dj/songs/fixtures/sessions.json',
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
        }
        r = self.client.post(reverse(self.list_url_name), new_obj)
        self.assertTrue(is_success(r.status_code), r.status_code)

    def test_update(self):
        update_obj = {
            "song": "a8d00a30-24cc-405b-b0a5-67b350063e28",
            "requester_name": "Some dude",
            "message": "this one goes out to the homies",
            "event": "282121e2-bd4a-4b43-b070-f376413f1082",
            "status": SongRequest.PLAYED_STATUS,
            "session": "7b4fffgy6fnhpdjcg8912qnxsyz3hv51",

        }
        r = self.client.put(reverse(self.detail_url_name, args=[self.test_object.uuid]), update_obj)
        self.assertTrue(is_success(r.status_code), r.data)

    def test_partial_update(self):
        status_only = {
            "status": SongRequest.DENIED_STATUS
        }
        r = self.client.patch(reverse(self.detail_url_name, args=[self.test_object.uuid]), status_only)
        self.assertTrue(is_success(r.status_code), r.data)
