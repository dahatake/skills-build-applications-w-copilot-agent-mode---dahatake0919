from django.contrib import admin
from .models import User, Team, Activity, Workout, Leaderboard

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    search_fields = ("name",)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "team", "is_active")
    search_fields = ("name", "email")
    list_filter = ("team", "is_active")

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ("user", "activity_type", "duration", "date")
    list_filter = ("activity_type", "date")
    search_fields = ("user__name", "activity_type")

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)

@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ("team", "total_points", "rank")
    list_filter = ("team",)
    ordering = ("rank",)
