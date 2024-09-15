from django.db import models
import uuid

# Create your models here.


class TeamMember(models.Model):
    ROLE_REGULAR = 'regular'
    ROLE_ADMIN = 'admin'
    ROLE_CHOICES = {
        ROLE_REGULAR: 'Regular',
        ROLE_ADMIN: 'Administrator',
    }

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    role = models.CharField(max_length=255, choices=ROLE_CHOICES, default=ROLE_REGULAR)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name} ({self.email})'
