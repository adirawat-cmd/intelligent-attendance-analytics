from extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False) # admin, faculty, student

    # Relationships
    student_profile = db.relationship('Student', backref='user', uselist=False, cascade="all, delete-orphan")
    faculty_profile = db.relationship('Faculty', backref='user', uselist=False, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "name": self.name,
            "email": self.email,
            "role": self.role
        }

class Student(db.Model):
    __tablename__ = 'student'
    student_id = db.Column(db.Integer, primary_key=True)
    roll_no = db.Column(db.String(50), unique=True, nullable=False)
    department = db.Column(db.String(100), nullable=False)
    semester = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

    enrollments = db.relationship('Enrollment', backref='student', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "student_id": self.student_id,
            "roll_no": self.roll_no,
            "department": self.department,
            "semester": self.semester,
            "user_id": self.user_id,
            "name": self.user.name if self.user else None
        }

class Faculty(db.Model):
    __tablename__ = 'faculty'
    faculty_id = db.Column(db.Integer, primary_key=True)
    designation = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

    courses = db.relationship('Course', backref='faculty', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "faculty_id": self.faculty_id,
            "designation": self.designation,
            "department": self.department,
            "user_id": self.user_id,
            "name": self.user.name if self.user else None
        }

class Course(db.Model):
    __tablename__ = 'course'
    course_id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False)
    credits = db.Column(db.Integer, nullable=False)
    faculty_id = db.Column(db.Integer, db.ForeignKey('faculty.faculty_id'), nullable=True)

    enrollments = db.relationship('Enrollment', backref='course', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "course_id": self.course_id,
            "course_name": self.course_name,
            "credits": self.credits,
            "faculty_id": self.faculty_id,
            "faculty_name": self.faculty.user.name if self.faculty and self.faculty.user else None
        }

class Enrollment(db.Model):
    __tablename__ = 'enrollment'
    enrollment_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.student_id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.course_id'), nullable=False)

    attendances = db.relationship('Attendance', backref='enrollment', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "enrollment_id": self.enrollment_id,
            "student_id": self.student_id,
            "course_id": self.course_id,
            "course_name": self.course.course_name if self.course else None,
            "student_name": self.student.user.name if self.student and self.student.user else None,
            "student_roll_no": self.student.roll_no if self.student else None
        }

class Attendance(db.Model):
    __tablename__ = 'attendance'
    attendance_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(20), nullable=False) # Present / Absent
    enrollment_id = db.Column(db.Integer, db.ForeignKey('enrollment.enrollment_id'), nullable=False)

    def to_dict(self):
        return {
            "attendance_id": self.attendance_id,
            "date": self.date.isoformat() if self.date else None,
            "status": self.status,
            "enrollment_id": self.enrollment_id,
            "student_id": self.enrollment.student_id if self.enrollment else None,
            "course_id": self.enrollment.course_id if self.enrollment else None
        }
