# Halt script on error
set -e

# Run migrations
python manage.py migrate

# Seed the database
python manage.py loaddata fixtures/data.json

# Start the server
python manage.py runserver 0.0.0.0:8000