# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-23 03:39
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0007_auto_20171023_0335'),
    ]

    operations = [
        migrations.AddField(
            model_name='songrequest',
            name='cookie',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='song_requests', to='songs.SongRequestCookie'),
            preserve_default=False,
        ),
    ]