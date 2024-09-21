FROM python:3.11-slim-bullseye
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app

# Expose the port
EXPOSE 8000

# Run the migrations
RUN python manage.py migrate

# Seed the database
RUN python manage.py loaddata fixtures/data.json

# Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]