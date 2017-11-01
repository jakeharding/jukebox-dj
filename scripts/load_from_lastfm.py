import requests

from jukebox_dj.songs.models import Category, Song, SongList
from jukebox_dj.users.models import DjProfile
from jukebox_dj.events.models import Event

dj = DjProfile.objects.first()
demo = Event.objects.create(dj=dj, name="Demo Party")
demo_list = SongList.objects.create(dj=dj, name="Prototype Demo")
demo_list.events.add(demo)

tags = requests.get("http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=6a2a687a792d7a34bd34fca954d0f924&format=json").json()

for t in tags['toptags']['tag']:
    print(t['name'])
    c = Category.objects.create(name=t['name'])
    tracks = requests.get("http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=%s&api_key=6a2a687a792d7a34bd34fca954d0f924&format=json" % t['name'])
    for track in tracks.json()['tracks']['track']:
        song = Song.objects.create(title=track['name'], artist=track['artist']['name'], dj=dj)
        song.song_lists.add(demo_list)
