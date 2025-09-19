from django.test import TestCase
from .models import Team

class BasicModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="Test Team")
        self.assertEqual(str(team), "Test Team")
