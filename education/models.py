from django.db import models


class Education(models.Model):
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    location = models.CharField(max_length=100, blank=True)
    start_year = models.IntegerField()
    end_year = models.IntegerField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    grade = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-start_year']
        verbose_name = 'Education'
        verbose_name_plural = 'Education'

    def __str__(self):
        return f"{self.degree} - {self.institution}"

    def year_range(self):
        end = "Present" if self.is_current else str(self.end_year)
        return f"{self.start_year} - {end}"
