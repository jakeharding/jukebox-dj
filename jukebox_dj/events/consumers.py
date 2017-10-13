from channels.generic.websockets import JsonWebsocketConsumer


class EventConsumer(JsonWebsocketConsumer):
    http_user = True

    def connection_groups(self, **kwargs):
        """
        Called to return the list of groups to automatically add/remove
        this connection to/from.
        """
        return ['event_%s' % kwargs['uuid']]

    def connect(self, message, **kwargs):
        """
        Perform things on connection start
        """
        # Accept the connection; this is done by default if you don't override
        # the connect function.
        self.message.reply_channel.send({"accept": True})

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

        self.group_send(self.connection_groups(**kwargs)[0], content)

    def disconnect(self, message, **kwargs):
        """
        Perform things on connection close
        """
        pass


class RequesterConsumer(JsonWebsocketConsumer):
    http_user = True

    def connect(self, message, **kwargs):
        """
        Perform things on connection start
        """
        # Accept the connection; this is done by default if you don't override
        # the connect function.
        self.message.reply_channel.send({"accept": True})

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
