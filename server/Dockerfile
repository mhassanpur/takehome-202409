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

# Bootstrap and run the application
ENTRYPOINT [ "/bin/bash", ".docker/init.sh" ]