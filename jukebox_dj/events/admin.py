"""
admin.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Setup app admin
"""


from django.contrib import admin

from jukebox_dj.events.models import Event


class EventAdmin(admin.ModelAdmin):
    readonly_fields = ('uuid', )


admin.site.register(Event, EventAdmin)
