from django.shortcuts import render
from bio.models import Bio
from education.models import Education
from skills.models import SkillCategory
from experience.models import Experience, Project


def home(request):
    bio = Bio.objects.first()
    education = Education.objects.all()
    skill_categories = SkillCategory.objects.prefetch_related('skills').all()
    experiences = Experience.objects.all()
    projects = Project.objects.all()

    context = {
        'bio': bio,
        'education': education,
        'skill_categories': skill_categories,
        'experiences': experiences,
        'projects': projects,
    }
    return render(request, 'portfolio/home.html', context)
