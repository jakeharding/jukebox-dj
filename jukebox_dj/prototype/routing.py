"""
routing.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Routes for Django channels
"""

from channels.routing import route

from jukebox_dj.prototype.consumers import ws_message, ws_add, ws_disconnect

channel_routing = [
    route("websocket.connect", ws_add, path=r"/event/"),
    route("websocket.receive", ws_message, path=r"/event/"),
    route("websocket.disconnect", ws_disconnect, path=r"/event/"),
]
