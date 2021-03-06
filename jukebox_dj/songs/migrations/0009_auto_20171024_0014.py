# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-24 00:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_djprofile'),
        ('songs', '0008_songrequest_cookie'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='dj',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='songs', to='users.DjProfile'),
        ),
        migrations.AlterField(
            model_name='songlist',
            name='dj',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='song_lists', to='users.DjProfile'),
        ),
    ]
