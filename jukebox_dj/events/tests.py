"""
tests.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Test REST for events.
"""

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse

from jukebox_dj.events.models import Event
from jukebox_dj.users.models import JukeboxUser


class RestApiTestException(Exception):
    def __init__(self):
        super().__init__("Test configuration error")


class RestApiTestCaseMixin:
    """
    Class to test the default functionality of endpoints for our REST API.
    Update, create, and partial update tests will raise an error if not overridden because they require model specific
    data.
    """
    list_url_name = ""
    detail_url_name = ""
    model_under_test = None
    test_object = None

    def setUp(self):
        user = JukeboxUser.objects.get(username="admin")
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + user.auth_token.key)

    def test_list(self):
        r = self.client.get(reverse(self.list_url_name))
        self.assertTrue(status.is_success(r.status_code))
        return r

    def test_get(self):
        r = self.client.get(reverse(self.detail_url_name, args=[self.test_object.uuid]))
        self.assertTrue(status.is_success(r.status_code))
        return r

    def test_update(self):
        raise RestApiTestException()

    def test_partial_update(self):
        raise RestApiTestException()

    def test_create(self):
        raise RestApiTestException()

    def test_delete(self):
        r = self.client.delete(reverse(self.detail_url_name, args=[self.test_object.uuid]))
        self.assertTrue(status.is_success(r.status_code))


class TestEventApi(APITestCase, RestApiTestCaseMixin):

    fixtures = ['jukebox_dj/users/fixtures/users.json', 'jukebox_dj/events/fixtures/events.json',
                'jukebox_dj/songs/fixtures/songs.json', 'jukebox_dj/songs/fixtures/song_lists.json',
                'jukebox_dj/songs/fixtures/requests.json', 'jukebox_dj/songs/fixtures/sessions.json',
                ]
    list_url_name = 'event-list'
    detail_url_name = 'event-detail'
    creds = {"username": "admin", "password": "admin"}

    def setUp(self):
        RestApiTestCaseMixin.setUp(self)
        self.test_object = Event.objects.first()

    def test_create(self):

        new_obj_data = {
            "name": "A party",
            "dj": "1234"
        }
        r = self.client.post(reverse(self.list_url_name), new_obj_data)
        self.assertTrue(status.is_success(r.status_code), r.data)

    def test_update(self):
        """All required fields are needed in PUT requests."""
        update_obj_data = {
            "name": "Changes to a shindig",
            "dj": "1234"
        }
        r = self.client.put(reverse(self.detail_url_name, args=[self.test_object.uuid]), update_obj_data)
        self.assertTrue(status.is_success(r.status_code), r.data)

    def test_partial_update(self):
        """All changed fields are needed in PATCH requests."""
        update_obj_data = {
            "name": "Like its 1999!",
        }
        r = self.client.patch(reverse(self.detail_url_name, args=[self.test_object.uuid]), update_obj_data)
        self.assertTrue(status.is_success(r.status_code), r.data)
