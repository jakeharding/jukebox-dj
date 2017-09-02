"""
asgi.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Asynchronous server gateway interface for Django channels
"""


import os
from channels.asgi import get_channel_layer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "jukebox_dj.settings")

channel_layer = get_channel_layer()
