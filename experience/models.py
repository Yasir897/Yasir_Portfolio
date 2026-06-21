from django.db import models


class Experience(models.Model):
    job_title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=100, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    technologies = models.CharField(max_length=300, blank=True, help_text="Comma-separated list")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-start_date']
        verbose_name = 'Experience'
        verbose_name_plural = 'Experience'

    def __str__(self):
        return f"{self.job_title} at {self.company}"

    def tech_list(self):
        return [t.strip() for t in self.technologies.split(',') if t.strip()]


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=300, blank=True, help_text="Comma-separated list")
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

    def __str__(self):
        return self.title

    def tech_list(self):
        return [t.strip() for t in self.technologies.split(',') if t.strip()]
