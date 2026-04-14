import requests
import pytest
from datetime import datetime

BASE_URL = "http://localhost:5000"

@pytest.fixture
def auth_token():
    """Fixture to get a valid faculty token."""
    login_data = {
        "email": "alan@school.edu",
        "password": "password"
    }
    r = requests.post(f"{BASE_URL}/login", json=login_data)
    assert r.status_code == 200
    return r.json().get('token')

def test_login():
    """Verify faculty login with valid credentials."""
    login_data = {
        "email": "alan@school.edu",
        "password": "password"
    }
    r = requests.post(f"{BASE_URL}/login", json=login_data)
    assert r.status_code == 200
    assert 'token' in r.json()

def test_mark_attendance_valid(auth_token):
    """Verify marking attendance with valid student IDs."""
    attendance_data = {
        "course_id": 1,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "records": [
            {"student_id": 1, "status": "Present"}
        ]
    }
    headers = {"Authorization": f"Bearer {auth_token}"}
    r = requests.post(f"{BASE_URL}/faculty/attendance/mark", json=attendance_data, headers=headers)
    assert r.status_code == 200
    assert r.json().get('message') == "Attendance marked successfully"

def test_mark_attendance_invalid_student(auth_token):
    """Verify that an invalid student ID returns a 400 error."""
    attendance_data = {
        "course_id": 1,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "records": [
            {"student_id": 999, "status": "Absent"}
        ]
    }
    headers = {"Authorization": f"Bearer {auth_token}"}
    r = requests.post(f"{BASE_URL}/faculty/attendance/mark", json=attendance_data, headers=headers)
    
   
    assert r.status_code == 400
    assert "Invalid or non-enrolled student IDs" in r.json().get('message')

def test_mark_attendance_invalid_date(auth_token):
    """Verify that an invalid date format returns a 400 error."""
    attendance_data = {
        "course_id": 1,
        "date": "invalid-date",
        "records": [
            {"student_id": 1, "status": "Present"}
        ]
    }
    headers = {"Authorization": f"Bearer {auth_token}"}
    r = requests.post(f"{BASE_URL}/faculty/attendance/mark", json=attendance_data, headers=headers)
    assert r.status_code == 400
    assert "Invalid date format" in r.json().get('message')
