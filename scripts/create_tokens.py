"""
Create auth tokens for any existing users.
"""


from jukebox_dj.users.models import JukeboxUser
from rest_framework.authtoken.models import Token


for user in JukeboxUser.objects.all():
    Token.objects.get_or_create(user=user)
