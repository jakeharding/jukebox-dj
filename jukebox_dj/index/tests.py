from django.test import TestCase


class TestIndexView(TestCase):

    def testView(self):
        r = self.client.get("/")
        self.assertTrue(r.status_code is 200)