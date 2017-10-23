"""
admin.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Admin config
"""


from django.contrib import admin

from jukebox_dj.songs.models import *

admin.site.register(Song)
admin.site.register(SongList)
admin.site.register(Category)
admin.site.register(SongRequest)


class CookieAdmin(admin.ModelAdmin):
    readonly_fields = ('uuid', )


admin.site.register(SongRequestCookie, CookieAdmin)
