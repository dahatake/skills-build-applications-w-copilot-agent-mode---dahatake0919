from django.core.management.base import BaseCommand
from django.db import transaction
from django.conf import settings
from pymongo import MongoClient, ASCENDING
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard
from datetime import date, timedelta


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient(host='localhost', port=27017)
        db = client['octofit_db']

        # Ensure unique index on email in raw users collection (in case ORM didn't create one)
        try:
            db.octofit_tracker_user.create_index([('email', ASCENDING)], unique=True)
        except Exception as e:
            self.stdout.write(self.style.WARNING(f"Index creation warning: {e}"))

        self.stdout.write(self.style.SUCCESS('Ensuring sample data...'))

        with transaction.atomic():
            Activity.objects.all().delete()
            Leaderboard.objects.all().delete()
            Workout.objects.all().delete()
            User.objects.all().delete()
            Team.objects.all().delete()

            marvel = Team.objects.create(name='Marvel', description='Marvel Heroes Team')
            dc = Team.objects.create(name='DC', description='DC Heroes Team')

            heroes_marvel = [
                ('Iron Man', 'ironman@example.com'),
                ('Captain America', 'cap@example.com'),
                ('Black Widow', 'widow@example.com'),
            ]
            heroes_dc = [
                ('Batman', 'batman@example.com'),
                ('Wonder Woman', 'wonderwoman@example.com'),
                ('Flash', 'flash@example.com'),
            ]

            users = []
            for name, email in heroes_marvel:
                users.append(User.objects.create(name=name, email=email, team=marvel))
            for name, email in heroes_dc:
                users.append(User.objects.create(name=name, email=email, team=dc))

            # Workouts
            w1 = Workout.objects.create(name='Strength Circuit', description='Full body strength session')
            w2 = Workout.objects.create(name='Cardio Blast', description='High intensity cardio')
            w1.suggested_for.add(marvel)
            w2.suggested_for.add(dc)

            # Activities (simple pattern)
            today = date.today()
            for idx, u in enumerate(users):
                Activity.objects.create(user=u, activity_type='Run', duration=30 + idx * 5, date=today - timedelta(days=idx))
                Activity.objects.create(user=u, activity_type='Lift', duration=20 + idx * 5, date=today - timedelta(days=idx+1))

            # Leaderboard points by team
            marvel_points = sum(a.duration for a in Activity.objects.filter(user__team=marvel))
            dc_points = sum(a.duration for a in Activity.objects.filter(user__team=dc))
            scores = sorted([(marvel, marvel_points), (dc, dc_points)], key=lambda x: x[1], reverse=True)
            for rank, (team, pts) in enumerate(scores, start=1):
                Leaderboard.objects.create(team=team, total_points=pts, rank=rank)

        self.stdout.write(self.style.SUCCESS('Database populated with sample superhero data.'))