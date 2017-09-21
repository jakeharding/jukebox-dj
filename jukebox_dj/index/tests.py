"""
tests.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Test around the index view.
"""

from django.test import TestCase

from rest_framework.status import HTTP_200_OK


class TestIndexView(TestCase):

    def testView(self):
        r = self.client.get("/")
        self.assertTrue(r.status_code is HTTP_200_OK)
