"""
tests.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Test email authentication backend is working correctly.
"""


from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.test import TestCase


class TestEmailAuth(TestCase):

    fixtures = ['jukebox_dj/users/fixtures/users.json', ]

    """
    Submit email in the username field to login.
    """
    def test_email_login(self):
        user = authenticate(**{'username': 'admin', 'password': 'admin'})
        self.assertTrue(isinstance(user, User), 'Should have success on login username', )

        user = authenticate(**{'username': 'a@a.com', 'password': 'admin'})
        self.assertTrue(isinstance(user, User), 'Should have success on login with email',)


