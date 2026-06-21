# Deploying this portfolio (free — PythonAnywhere)

This Django portfolio is ready to deploy. Below are the exact steps.

---

## 1. Push the project to GitHub

From the project folder (`django-portfolio`):

```bash
git init
git add .
git commit -m "Portfolio ready to deploy"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

> `db.sqlite3` is git-ignored on purpose — content is restored on the server
> from `fixtures/initial_data.json`. Uploaded images in `media/` **are** committed.

---

## 2. PythonAnywhere setup (free "Beginner" plan)

1. Sign up at https://www.pythonanywhere.com
2. Open a **Bash console** and clone your repo:

   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

3. Create a virtualenv and install dependencies:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

4. Set up the database, content and an admin user:

   ```bash
   python manage.py migrate
   python manage.py loaddata fixtures/initial_data.json   # restores all content
   python manage.py createsuperuser                       # make your admin login
   python manage.py collectstatic --noinput
   ```

---

## 3. Create the web app

1. Go to the **Web** tab → **Add a new web app** → **Manual configuration** → Python 3.x
2. **Virtualenv** section → enter:
   `/home/<user>/<repo-name>/venv`
3. **WSGI configuration file** (click to edit) — replace its contents with:

   ```python
   import os, sys

   path = '/home/<user>/<repo-name>'
   if path not in sys.path:
       sys.path.insert(0, path)

   os.environ['DJANGO_SETTINGS_MODULE'] = 'portfolio.settings'
   os.environ['DJANGO_DEBUG'] = 'False'
   os.environ['DJANGO_ALLOWED_HOSTS'] = '<user>.pythonanywhere.com'
   # Optional but recommended — set your own secret:
   # os.environ['DJANGO_SECRET_KEY'] = 'put-a-long-random-string-here'

   from django.core.wsgi import get_wsgi_application
   application = get_wsgi_application()
   ```

4. **Static files** section → add:
   | URL | Directory |
   |--------|------------------------------------------------|
   | `/static/` | `/home/<user>/<repo-name>/staticfiles` |
   | `/media/`  | `/home/<user>/<repo-name>/media`       |

5. Click the big green **Reload** button.

Your site is live at: **https://&lt;user&gt;.pythonanywhere.com** 🎉
Admin panel: **https://&lt;user&gt;.pythonanywhere.com/admin**

---

## Updating the site later

```bash
# locally
git add . && git commit -m "update" && git push

# on the PythonAnywhere Bash console
cd <repo-name>
git pull
source venv/bin/activate
python manage.py migrate
python manage.py collectstatic --noinput
# then click Reload on the Web tab
```

---

## Local development (unchanged)

```bash
python manage.py runserver
```
`DEBUG` stays on locally; `127.0.0.1` / `localhost` are auto-allowed.
