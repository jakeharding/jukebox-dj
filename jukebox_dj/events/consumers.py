from channels.generic.websockets import JsonWebsocketConsumer
from channels.message import Message


class EventConsumer(JsonWebsocketConsumer):
    http_user = True

    def connection_groups(self, **kwargs):
        """
        Called to return the list of groups to automatically add/remove
        this connection to/from.
        """
        groups = ['event_%s' % kwargs['uuid']]
        if kwargs.get('session'):
            groups.append('event_%s_requester_%s' % (kwargs['uuid'], kwargs.get('session')))
        return groups

    # def connect(self, message, **kwargs):
    #     """
    #     Perform things on connection start
    #     """
    #     # Accept the connection; this is done by default if you don't override
    #     # the connect function.
    #     self.message.reply_channel.send({"accept": True})

    def receive(self, content, **kwargs):
        """
        Called when a message is received with either text or bytes
        filled out.
        """
        # TODO Logic for determining if song available for play and should be forwarded to dj
        # TODO Figure out how to send update to requester from this consumer.
        # If song request status is queued or requested then automatically deny
        # if song request status is denied and older than 1 hour then forward to dj. less than an hour deny
        # If song has been played and older than 1 hour then forward to dj less than an hour deny
        groups = self.connection_groups(**kwargs)
        group = groups[0]
        if kwargs.get('session'):
            group = groups[1]
        self.group_send(group, content)

    # def disconnect(self, message, **kwargs):
    #     """
    #     Perform things on connection close
    #     """
    #     pass


class RequesterConsumer(JsonWebsocketConsumer):
    http_user = True

    # def connect(self, message, **kwargs):
    #     """
    #     Perform things on connection start
    #     """
    #     # Accept the connection; this is done by default if you don't override
    #     # the connect function.
    #     self.message.reply_channel.send({"accept": True})

    def receive(self,content, **kwargs):
        """
        Called when a message is received with either text or bytes
        filled out.
        """
        # TODO Logic for determining if song available for play and should be forwarded to dj
        # TODO Figure out how to send update to requester from this consumer.
        # If song request status is queued or requested then automatically deny
        # if song request status is denied and older than 1 hour then forward to dj. less than an hour deny
        # If song has been played and older than 1 hour then forward to dj less than an hour deny

        self.send(content)

    def disconnect(self, message, **kwargs):
        """
        Perform things on connection close
        """
        pass
