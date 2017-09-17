"""
__init__.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Setup app config
"""


from django.conf import settings
from django.db import models as m


class Event(m.Model):
    name = m.CharField(max_length=255)
    description = m.TextField(blank=True, null=True)
    dj = m.ForeignKey(settings.AUTH_USER_MODEL)
    created_at = m.DateTimeField(auto_now_add=True)
    is_active = m.BooleanField(default=False)
