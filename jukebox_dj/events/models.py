"""
__init__.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Setup app config
"""


import uuid

from django.conf import settings
from django.db import models as m


class Event(m.Model):
    uuid = m.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    name = m.CharField(max_length=255)
    dj = m.ForeignKey(settings.AUTH_USER_MODEL)
    created_at = m.DateTimeField(auto_now_add=True)
    is_active = m.BooleanField(default=False)
