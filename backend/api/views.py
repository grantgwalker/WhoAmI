from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def get_profile(request):
    """
    API endpoint to get user profile information
    """
    profile_data = {
        'name': 'John Doe',
        'title': 'Software Developer',
        'bio': 'A passionate developer building amazing web applications.',
        'skills': ['React', 'Next.js', 'Python', 'Django', 'TypeScript'],
        'email': 'contact@example.com',
    }
    return Response(profile_data)


@api_view(['GET'])
def get_projects(request):
    """
    API endpoint to get list of projects
    """
    projects = [
        {
            'id': 1,
            'title': 'Personal Website',
            'description': 'A modern personal website built with React, Next.js, and Django',
            'technologies': ['React', 'Next.js', 'Django', 'TypeScript'],
        },
        {
            'id': 2,
            'title': 'Portfolio App',
            'description': 'A portfolio application showcasing various projects',
            'technologies': ['Python', 'JavaScript', 'HTML', 'CSS'],
        },
    ]
    return Response(projects)
