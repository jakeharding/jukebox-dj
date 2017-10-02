# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-26 00:04
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_auto_20170920_2026'),
        ('songs', '0002_auto_20170917_0601'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='song',
        ),
        migrations.RemoveField(
            model_name='category',
            name='song_list',
        ),
        migrations.RemoveField(
            model_name='song',
            name='song_list',
        ),
        migrations.RemoveField(
            model_name='songlist',
            name='event',
        ),
        migrations.AddField(
            model_name='category',
            name='song_lists',
            field=models.ManyToManyField(blank=True, null=True, related_name='categories', to='songs.SongList'),
        ),
        migrations.AddField(
            model_name='category',
            name='songs',
            field=models.ManyToManyField(blank=True, null=True, related_name='categories', to='songs.Song'),
        ),
        migrations.AddField(
            model_name='song',
            name='song_lists',
            field=models.ManyToManyField(blank=True, null=True, related_name='songs', to='songs.SongList'),
        ),
        migrations.AddField(
            model_name='songlist',
            name='events',
            field=models.ManyToManyField(blank=True, null=True, related_name='song_lists', to='events.Event'),
        ),
        migrations.AddField(
            model_name='songrequest',
            name='status',
            field=models.SmallIntegerField(choices=[(0, 'Requested'), (1, 'Queued'), (2, 'Denied'), (3, 'Played')], default=0),
        ),
        migrations.AlterField(
            model_name='songrequest',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='song_requests', to='events.Event'),
        ),
        migrations.AlterField(
            model_name='songrequest',
            name='song',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='song_requests', to='songs.Song'),
        ),
    ]