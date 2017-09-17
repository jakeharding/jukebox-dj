"""
models.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Models around the user.
"""


import uuid

from django.db import models as m
from django.contrib.auth.models import AbstractUser


class JukeboxUser(AbstractUser):
    uuid = m.UUIDField(unique=True, default=uuid.uuid4, editable=False)
