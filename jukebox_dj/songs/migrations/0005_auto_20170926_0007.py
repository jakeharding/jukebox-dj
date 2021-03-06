# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-26 00:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0004_auto_20170926_0006'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='song_lists',
            field=models.ManyToManyField(blank=True, related_name='categories', to='songs.SongList'),
        ),
        migrations.AlterField(
            model_name='category',
            name='songs',
            field=models.ManyToManyField(blank=True, related_name='categories', to='songs.Song'),
        ),
        migrations.AlterField(
            model_name='song',
            name='song_lists',
            field=models.ManyToManyField(blank=True, related_name='songs', to='songs.SongList'),
        ),
        migrations.AlterField(
            model_name='songlist',
            name='events',
            field=models.ManyToManyField(blank=True, related_name='song_lists', to='events.Event'),
        ),
    ]
