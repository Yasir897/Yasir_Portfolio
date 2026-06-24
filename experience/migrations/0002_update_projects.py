from django.db import migrations


# Projects whose GitHub repos were removed — delete them (dead links).
DEAD_TITLES = ["Car Selling System", "BudgetBuddy"]

# New projects to showcase (C++ / database / DSA university work).
NEW_PROJECTS = [
    {
        "title": "Hospital Management System",
        "description": (
            "A comprehensive console-based Hospital Management System in C++ using "
            "Object-Oriented Programming and file handling. Manages doctors, patients, "
            "pharmacy, blood bank, ambulance, equipment, lab reports and receipts — "
            "with all records persisted to files so data survives between runs."
        ),
        "technologies": "C++, OOP, File Handling",
        "github_url": "https://github.com/Yasir897/hospital-management-system-cpp",
        "is_featured": True,
        "order": 2,
    },
    {
        "title": "Online Clothing Store",
        "description": (
            "A full e-commerce web application for an online clothing brand, built with "
            "PHP and MySQL. Features a product storefront, cart and checkout, user "
            "accounts, and a secure admin panel to add, edit and manage products."
        ),
        "technologies": "PHP, MySQL, HTML, CSS",
        "github_url": "https://github.com/Yasir897/online-clothing-store-php",
        "is_featured": True,
        "order": 3,
    },
    {
        "title": "Hotel Management System (DSA)",
        "description": (
            "A Hotel Management System in C++ that demonstrates core data structures "
            "working together — Linked Lists for floors and rooms, a Queue for booking "
            "requests, and a Stack to cancel the last booking. My Data Structures & "
            "Algorithms semester project."
        ),
        "technologies": "C++, Data Structures, Linked List, Stack, Queue",
        "github_url": "https://github.com/Yasir897/hotel-management-dsa-cpp",
        "is_featured": True,
        "order": 4,
    },
    {
        "title": "Flight Management System",
        "description": (
            "A console-based Flight / Airline Reservation System in C++ built with "
            "Object-Oriented Programming — inheritance with Person, Passenger and Staff "
            "classes, flight records, seat booking and incident reports."
        ),
        "technologies": "C++, OOP",
        "github_url": "https://github.com/Yasir897/flight-management-system-cpp",
        "is_featured": False,
        "order": 5,
    },
    {
        "title": "Tic-Tac-Toe (C++ OOP)",
        "description": (
            "A feature-rich two-player Tic-Tac-Toe game in C++ using OOP (classes, "
            "inheritance and friend classes). Supports in-game commands to edit a "
            "player's name, undo the last move, or exit at any time."
        ),
        "technologies": "C++, OOP",
        "github_url": "https://github.com/Yasir897/tic-tac-toe-oop-cpp",
        "is_featured": False,
        "order": 6,
    },
]


def update_projects(apps, schema_editor):
    Project = apps.get_model("experience", "Project")
    # remove dead-link projects
    Project.objects.filter(title__in=DEAD_TITLES).delete()
    # add / update the new ones (idempotent by title)
    for data in NEW_PROJECTS:
        Project.objects.update_or_create(
            title=data["title"],
            defaults={
                "description": data["description"],
                "technologies": data["technologies"],
                "github_url": data["github_url"],
                "is_featured": data["is_featured"],
                "order": data["order"],
            },
        )


def reverse_projects(apps, schema_editor):
    Project = apps.get_model("experience", "Project")
    Project.objects.filter(title__in=[p["title"] for p in NEW_PROJECTS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("experience", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(update_projects, reverse_projects),
    ]
