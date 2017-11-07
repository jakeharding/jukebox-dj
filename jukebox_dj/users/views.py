"""
views.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Will hold the ViewSets and Serializers for users.
"""


from rest_framework.serializers import ModelSerializer, SlugRelatedField
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from .models import JukeboxUser, DjProfile


class UserSerializer(ModelSerializer):

    class Meta:
        model = JukeboxUser
        exclude = ('id', 'last_login', 'is_superuser', 'is_staff', 'is_active', 'groups', 'user_permissions')


class DjProfileSerializer(ModelSerializer):

    user = UserSerializer()

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = JukeboxUser.objects.create(**user_data)
        dj = DjProfile.objects.create(**validated_data, user=user)
        return dj

    def update(self, dj, valid_data):
        user_data = valid_data.pop("user", None)
        if user_data:
            for k, v in user_data.items():
                setattr(dj.user, k, v)
            dj.user.save()
        for k, v in valid_data.items():
            setattr(dj, k, v)
        dj.save()
        return dj

    class Meta:
        model = DjProfile
        exclude = ["user"]


class DjViewSet(ModelViewSet):
    queryset = DjProfile.objects.all()
    serializer_class = DjProfileSerializer
    lookup_field = 'dj_id'

    def retrieve(self, request, dj_id=None, *args, **kwargs):
        if dj_id == 'me':
            if getattr(request.user, 'djprofile', None):
                serial = DjProfileSerializer(request.user.djprofile)
                return Response(serial.data)
        return super().retrieve(request, *args, **kwargs)

