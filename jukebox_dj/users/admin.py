"""
admin.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Admin config
"""


from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from jukebox_dj.users.models import JukeboxUser, DjProfile


class JukeboxUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'uuid')


admin.site.register(JukeboxUser, JukeboxUserAdmin)
admin.site.register(DjProfile)
