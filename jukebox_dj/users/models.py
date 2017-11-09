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
from django.conf import settings
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(m.signals.post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """Create a token for any new users created."""
    if created:
        Token.objects.create(user=instance)


class JukeboxUser(AbstractUser):
    uuid = m.UUIDField(unique=True, default=uuid.uuid4, editable=False)


class DjProfile(m.Model):
    user = m.OneToOneField('users.JukeboxUser')
    dj_id = m.CharField(max_length=4, unique=True)
    display_name = m.CharField(max_length=255)
    bio = m.TextField(blank=True, null=True)

    def __str__(self):
        return self.display_name
