from django.contrib import admin
from .models import Bio


@admin.register(Bio)
class BioAdmin(admin.ModelAdmin):
    list_display = ['name', 'job_title', 'email', 'location']
