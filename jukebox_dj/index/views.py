"""
views.py - (C) Copyright - 2017

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Views for the index page
"""

from django.views.generic.base import TemplateView


class IndexView(TemplateView):
    template_name = "index.html"
