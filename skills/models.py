from django.db import models


class SkillCategory(models.Model):
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Skill Category'
        verbose_name_plural = 'Skill Categories'

    def __str__(self):
        return self.name


class Skill(models.Model):
    PROFICIENCY_CHOICES = [
        (20, 'Beginner'),
        (40, 'Elementary'),
        (60, 'Intermediate'),
        (80, 'Advanced'),
        (100, 'Expert'),
    ]

    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    proficiency = models.IntegerField(choices=PROFICIENCY_CHOICES, default=60)
    icon_class = models.CharField(max_length=100, blank=True, help_text="e.g. devicon-python-plain")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Skill'
        verbose_name_plural = 'Skills'

    def __str__(self):
        return f"{self.name} ({self.get_proficiency_display()})"
