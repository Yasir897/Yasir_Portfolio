from django.contrib import admin
from .models import Experience, Project


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['job_title', 'company', 'start_date', 'end_date', 'is_current']
    list_filter = ['is_current']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_featured', 'order']
    list_filter = ['is_featured']
