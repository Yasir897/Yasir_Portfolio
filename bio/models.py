from django.db import models


class Bio(models.Model):
    name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=150)
    tagline = models.CharField(max_length=200, blank=True)
    profile_picture = models.ImageField(upload_to='bio/', blank=True, null=True)
    description = models.TextField()
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True)

    class Meta:
        verbose_name = 'Bio'
        verbose_name_plural = 'Bio'

    def __str__(self):
        return self.name
