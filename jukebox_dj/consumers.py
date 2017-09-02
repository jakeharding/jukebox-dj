"""
consumers.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Consumers to handle Channel messages
"""

from channels import Group


def ws_add(message):
    print(message)
    # Accept the incoming connection
    message.reply_channel.send({"accept": True})
    # Add them to the chat group
    Group("event").add(message.reply_channel)


# Connected to websocket.disconnect
def ws_disconnect(message):
    print(message)
    Group("event").discard(message.reply_channel)


# Connected to websocket.receive
def ws_message(message):
    print(message)
    Group("event").send({"content":message.content})
