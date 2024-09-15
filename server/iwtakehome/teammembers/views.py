from django.shortcuts import render
from rest_framework import permissions, viewsets
from .models import TeamMember
from .serializers import TeamMemberSerializer

# Create your views here.


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    # Note: The exercise did not specify authentication, so we're allowing any user access to this. But in a production
    # environment, we would obviously require authentication.
    permission_classes = [permissions.AllowAny]
