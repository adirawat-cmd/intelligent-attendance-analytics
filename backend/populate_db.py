from app import create_app
from extensions import db
from models import User, Student, Faculty, Course, Enrollment, Attendance
from datetime import datetime, timedelta

app = create_app()

with app.app_context():
    # Clear existing data
    db.drop_all()
    db.create_all()

    # 1. Create Admin
    admin = User(name="System Admin", email="admin@school.edu", password="password", role="admin")
    db.session.add(admin)

    # 2. Create Faculty
    f1 = User(name="Dr. Alan Turing", email="alan@school.edu", password="password", role="faculty")
    f2 = User(name="Dr. Grace Hopper", email="grace@school.edu", password="password", role="faculty")
    db.session.add_all([f1, f2])
    db.session.flush()

    fac1 = Faculty(designation="Professor", department="Computer Science", user_id=f1.user_id)
    fac2 = Faculty(designation="Associate Professor", department="Data Science", user_id=f2.user_id)
    db.session.add_all([fac1, fac2])
    db.session.flush()

    # 3. Create Students
    s1 = User(name="John Doe", email="john@student.edu", password="password", role="student")
    s2 = User(name="Jane Smith", email="jane@student.edu", password="password", role="student")
    db.session.add_all([s1, s2])
    db.session.flush()

    stu1 = Student(roll_no="CS101", department="Computer Science", semester=3, user_id=s1.user_id)
    stu2 = Student(roll_no="DS202", department="Data Science", semester=3, user_id=s2.user_id)
    db.session.add_all([stu1, stu2])
    db.session.flush()

    # 4. Create Courses
    c1 = Course(course_name="Data Structures", credits=4, faculty_id=fac1.faculty_id)
    c2 = Course(course_name="Machine Learning", credits=3, faculty_id=fac2.faculty_id)
    db.session.add_all([c1, c2])
    db.session.flush()

    # 5. Enroll Students
    e1 = Enrollment(student_id=stu1.student_id, course_id=c1.course_id)
    e2 = Enrollment(student_id=stu2.student_id, course_id=c1.course_id)
    e3 = Enrollment(student_id=stu2.student_id, course_id=c2.course_id)
    db.session.add_all([e1, e2, e3])
    db.session.flush()

    # 6. Mark some Attendance
    today = datetime.utcnow().date()
    yesterday = today - timedelta(days=1)
    
    att1 = Attendance(date=yesterday, status="Present", enrollment_id=e1.enrollment_id)
    att2 = Attendance(date=yesterday, status="Absent", enrollment_id=e2.enrollment_id)
    att3 = Attendance(date=today, status="Present", enrollment_id=e1.enrollment_id)
    att4 = Attendance(date=today, status="Present", enrollment_id=e2.enrollment_id)
    
    db.session.add_all([att1, att2, att3, att4])

    db.session.commit()
    print("Database populated gracefully with sample data!")
