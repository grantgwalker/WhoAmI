from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def get_profile(request):
    """
    API endpoint to get user profile information
    """
    profile_data = {
        'name': 'Grant Walker',
        'title': 'Software Developer',
        'bio': 'A passionate software engineer who thrives at the intersection of technology and human-centered design. With experience in both enterprise and startup environments, I excel at defining requirements, collaborating across disciplines, and delivering impactful solutions that improve real-world processes.',
        'skills': [
            'TypeScript/JavaScript',
            'Python',
            'Rust',
            'React',
            'Angular',
            'Next.js',
            'Spring Boot',
            'AWS Amplify & DynamoDB',
            'SQL',
            'Tailwind',
            'Java',
            'C#'
        ],
        'email': 'grantgwalker24@gmail.com',
    }
    return Response(profile_data)


@api_view(['GET'])
def get_experience(request):
    """
    API endpoint to get job experience
    """
    experience = [
        {
            'id': 1,
            'company': 'FORCEAI',
            'title': 'Full Stack Agentic Developer',
            'period': 'October 2025 – November 2025',
            'description': 'Full Stack developer for an agent OS system utilizing rapid agentic coding practices while verifying agentic output. Designed user-friendly front-end React-Tailwind interfaces while refactoring the Python-Rust back-end for improved performance.',
            'technologies': ['React', 'TypeScript', 'Tailwind', 'Python', 'Rust'],
        },
        {
            'id': 2,
            'company': 'Machine Research Corporation',
            'title': 'Full Stack Web Developer',
            'period': 'March 2025 – July 2025',
            'description': 'Developed and maintained production-grade web applications, translating stakeholder requirements into intuitive user experiences. Built and deployed 10+ front-end and back-end components. Collaborated cross-functionally to identify and resolve 15+ high-impact bugs.',
            'technologies': ['TypeScript', 'Angular', 'Redux', 'AWS Amplify', 'AWS DynamoDB', 'HTML', 'CSS'],
        },
        {
            'id': 3,
            'company': 'Tektronix',
            'title': 'Innovation Software Engineer',
            'period': 'July 2022 – November 2024',
            'description': 'Led UI/UX workshops and implemented over 20 features for the Defect Tracking System web app. Developed AI solutions and educated peers on AI use cases. Created RPA bot saving up to $40,000 and MLVI solution saving over 8,700 hours per year.',
            'technologies': ['Java', 'Spring Boot', 'Thymeleaf', 'SQL', 'PowerAutomate', 'Cognex', 'RPA', 'VBA'],
        },
    ]
    return Response(experience)


@api_view(['GET'])
def get_projects(request):
    """
    API endpoint to get personal projects
    """
    projects = [
        {
            'id': 1,
            'title': 'Creative Writing Helper',
            'description': 'A full-stack web application that helps users practice creative writing by providing classical text excerpts as inspiration. Features writing type selection, excerpt browsing, writing practice interface, and daily streak tracking.',
            'technologies': ['Next.js', 'TypeScript', 'Tailwind', 'Django', 'PostgreSQL', 'Django REST Framework', 'Axios'],
            'link': 'https://github.com/grantgwalker/CreativeWritingHelper',
        },
        {
            'id': 2,
            'title': 'WhoAmI - Personal Website',
            'description': 'A modern personal portfolio website built with React, Next.js, and Django REST Framework. Features responsive design, dark mode support, and dynamic content.',
            'technologies': ['React', 'Next.js', 'Django', 'TypeScript', 'Tailwind', 'Python'],
            'link': 'https://github.com/grantgwalker/WhoAmI',
        },
    ]
    return Response(projects)
