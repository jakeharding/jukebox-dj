"""
backends.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Email authentication.
Borrowed from https://djangosnippets.org/snippets/10547/.
"""

from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend


class UserModelEmailBackend(ModelBackend):

    def authenticate(self, username="", password="", **kwargs):
        try:
            user = get_user_model().objects.get(email__iexact=username)
            if check_password(password, user.password):
                return user
            else:
                return None
        except get_user_model().DoesNotExist:
            # No user was found, return None - triggers default login failed
            return None