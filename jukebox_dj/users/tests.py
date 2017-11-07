"""
tests.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Test email authentication backend is working correctly.
"""


import json

from django.contrib.auth import authenticate
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.reverse import reverse

from jukebox_dj.users.models import JukeboxUser, DjProfile
from jukebox_dj.events.tests import RestApiTestCaseMixin


class TestDjApi(APITestCase, RestApiTestCaseMixin):

    list_url_name = 'djprofile-list'
    detail_url_name = 'djprofile-detail'
    model_under_test = DjProfile

    fixtures = ['jukebox_dj/users/fixtures/users.json']

    def setUp(self):
        RestApiTestCaseMixin.setUp(self)
        self.test_object = DjProfile.objects.first()

    def test_get_me(self):
        # Logged in should return user info
        self.client.login(username="admin", password="admin")
        r = self.client.get("/api/dev/djs/me")
        user = JukeboxUser.objects.get(username="admin")
        self.assertTrue(status.is_success(r.status_code), r.status_code)
        self.assertEqual(r.data.get('dj_id'), user.djprofile.dj_id, r.data)

        # Not logged in should get a 404
        self.client.logout()
        r = self.client.get("/api/dev/djs/me")
        self.assertTrue(status.is_client_error(r.status_code), r.status_code)

    def test_get(self):
        r = self.client.get(reverse(self.detail_url_name, args=[self.test_object.dj_id]))
        self.assertTrue(status.is_success(r.status_code))
        return r

    def test_create(self):
        """Support nested create of dj profile and user."""
        test_data = {
            "dj_id": "uRoK",
            "display_name": "Rokking in Ammerica",
            "bio": "Rokking you in your party!!!",
            "user": {
                "first_name": "Jazzy Jeff",
                "last_name": "the Fresh Prince",
                "email": "jazz@fresh.prince",
                "username": "freshyFreshy",
                "password": "Merica"
            }
        }
        r = self.client.post(reverse(self.list_url_name), json.dumps(test_data), content_type='application/json')
        self.assertTrue(status.is_success(r.status_code), r.data)
        dj = DjProfile.objects.last()
        self.assertEqual(dj.dj_id, "uRoK", dj.dj_id)

    def test_update(self):
        """Should support update also"""
        test_data = {
            "dj_id": "uRoK",
            "display_name": "America Rocks",
            "bio": "Switch up the scene",
            "user": {
                "first_name": "Party on Wayne",
                "last_name": "Party on Garthe",
                "email": "new@waynes.world",
                "username": "freshyFreshy",
                "password": "Merica"
            }
        }
        r = self.client.put(reverse(self.detail_url_name, args=["1234"]), json.dumps(test_data), content_type='application/json')
        self.assertTrue(status.is_success(r.status_code), r.data)
        dj = DjProfile.objects.last()
        self.assertEqual(dj.dj_id, "uRoK", dj.dj_id)

    def test_delete(self):
        r = self.client.delete(reverse(self.detail_url_name, args=[self.test_object.dj_id]))
        self.assertTrue(status.is_success(r.status_code))

    def test_partial_update(self):
        test_data = {
            "display_name": "Yeah Buddy!!"
        }

        r = self.client.patch(
            reverse(self.detail_url_name, args=["1234"]),
            json.dumps(test_data), content_type='application/json'
        )
        self.assertTrue(status.is_success(r.status_code), r.data)
        dj = DjProfile.objects.get(dj_id="1234")
        self.assertEqual(dj.display_name, "Yeah Buddy!!", dj.dj_id)


class TestEmailAuth(TestCase):

    fixtures = ['jukebox_dj/users/fixtures/users.json', ]

    """
    Submit email in the username field to login.
    """
    def test_email_login(self):
        user = authenticate(**{'username': 'admin', 'password': 'admin'})
        self.assertTrue(isinstance(user, JukeboxUser), 'Should have success on login username', )

        user = authenticate(**{'username': 'a@a.com', 'password': 'admin'})
        self.assertTrue(isinstance(user, JukeboxUser), 'Should have success on login with email',)

        user = authenticate(**{'username': 'sesf@a.com', 'password': 'admin'})
        self.assertIsNone(user, 'Should not authenticate')
