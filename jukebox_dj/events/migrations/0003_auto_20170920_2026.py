# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-20 20:26
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_auto_20170917_0604'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='description',
        ),
        migrations.AddField(
            model_name='event',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]
