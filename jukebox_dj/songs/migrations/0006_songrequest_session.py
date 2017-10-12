# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-12 23:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sessions', '0001_initial'),
        ('songs', '0005_auto_20170926_0007'),
    ]

    operations = [
        migrations.AddField(
            model_name='songrequest',
            name='session',
            field=models.ForeignKey(default='7b4fffgy6fnhpdjcg8912qnxsyz3hv51', on_delete=django.db.models.deletion.CASCADE, related_name='song_requests', to='sessions.Session'),
            preserve_default=False,
        ),
    ]
