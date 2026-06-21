#!/usr/bin/env bash
#
# One-command deploy for PythonAnywhere.
# Usage (on the PythonAnywhere Bash console):
#     cd ~/Yasir_Portfolio && bash deploy.sh
#
# It pulls the latest code, updates dependencies, runs migrations,
# rebuilds static files, and reloads the live web app.

set -e

PROJECT_DIR="/home/yasir897/Yasir_Portfolio"
WSGI_FILE="/var/www/yasir897_pythonanywhere_com_wsgi.py"

echo "==> Moving to project..."
cd "$PROJECT_DIR"

echo "==> Pulling latest code from GitHub..."
git pull

echo "==> Activating virtualenv..."
source venv/bin/activate

echo "==> Installing/updating dependencies..."
pip install -r requirements.txt

echo "==> Applying database migrations..."
python manage.py migrate --noinput

echo "==> Collecting static files..."
python manage.py collectstatic --noinput

echo "==> Reloading the web app..."
touch "$WSGI_FILE"

echo ""
echo "✅ Deployed & reloaded — https://yasir897.pythonanywhere.com"
