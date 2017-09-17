"""
models.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Models around the user.
"""


from django.db import models as m
from django.contrib.auth.models import User


class DjUser(User):
    class Meta:
        proxy = True

