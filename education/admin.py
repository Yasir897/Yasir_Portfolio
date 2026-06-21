from django.contrib import admin
from .models import Education


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'start_year', 'end_year', 'is_current']
    list_filter = ['is_current']
