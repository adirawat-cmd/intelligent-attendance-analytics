# Intelligent Attendance & Engagement Analytics System

## Project Overview
The Intelligent Attendance & Engagement Analytics System is a web-based application designed to help educational institutions record, analyze, and visualize student attendance and engagement data.

## Problem It Solves
Traditional attendance systems only record presence or absence and do not provide meaningful insights. Faculty members lack tools to analyze attendance trends and identify students who may be disengaged or at risk academically.

## Target Users (Personas)
- Faculty Members – record attendance and view analytics
- Students – view personal attendance summaries
- Administrators – manage users, courses, and system configuration

## Vision Statement
To provide a simple yet intelligent platform that transforms attendance data into actionable academic insights.

## Key Features / Goals
- Attendance recording for courses
- Attendance and engagement analytics dashboard
- Student-wise attendance summaries
- Report generation
- Role-based access for faculty, students, and administrators

## Success Metrics
- Accurate attendance records
- Clear visualization of attendance trends
- Identification of low-attendance patterns
- Positive feedback from faculty users

## Assumptions & Constraints
- Internet access is available to users
- The system is developed within a limited academic timeline
- Open-source tools and free-tier services are used


## MoSCoW Prioritization

### Must Have
- User authentication and role-based access
- Faculty attendance recording
- Student attendance viewing
- Attendance data storage
- Basic analytics dashboard

### Should Have
- Course-wise attendance analytics
- Attendance report generation
- Admin management of users and courses

### Could Have
- Attendance alerts and notifications
- Export attendance data to CSV
- Visual charts for trends

### Won’t Have (For Now)
- AI-based attendance prediction
- Biometric or facial recognition
- Mobile application support

  ## Branching Strategy

This project follows GitHub Flow. The `main` branch contains stable code, while new features and changes are developed in separate feature branches and merged back into `main` after review.

## Local Development Tools
- Git and GitHub
- Docker Desktop
- Vs Code
- Python

## Quick Start – Local Development

### Prerequisites
- Docker Desktop installed

### Steps
1. Navigate to backend directory
2. Build the Docker image:
   docker build -t attendance-backend .
3. Run the container:
   docker run -p 5000:5000 attendance-backend
4. Open browser and visit:
   http://localhost:5000

