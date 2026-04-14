from flask import Blueprint, request, jsonify
from extensions import db
from models import Course, Student, Enrollment, Attendance
from utils import token_required

faculty_bp = Blueprint('faculty', __name__)

@faculty_bp.route('/courses', methods=['GET'])
@token_required(roles=['faculty'])
def get_courses(current_user):
    if not current_user.faculty_profile:
        return jsonify({'message': 'Faculty profile not found'}), 404
        
    courses = Course.query.filter_by(faculty_id=current_user.faculty_profile.faculty_id).all()
    return jsonify([c.to_dict() for c in courses]), 200

@faculty_bp.route('/students', methods=['GET'])
@token_required(roles=['faculty'])
def get_students(current_user):
    course_id = request.args.get('course_id')
    if not course_id:
        return jsonify({'message': 'course_id is required'}), 400
        
    enrollments = Enrollment.query.filter_by(course_id=course_id).all()
    # attach enrollment_id for frontend to use in marking attendance
    students = []
    for e in enrollments:
        student_data = e.student.to_dict()
        student_data['enrollment_id'] = e.enrollment_id
        students.append(student_data)
        
    return jsonify(students), 200

@faculty_bp.route('/attendance/mark', methods=['POST'])
@token_required(roles=['faculty'])
def mark_attendance(current_user):
    data = request.get_json()
    course_id = data.get('course_id')
    date_str = data.get('date') 
    records = data.get('records') # List of dicts {student_id: int, status: string}
    
    if not all([course_id, date_str, records]):
        return jsonify({'message': 'Missing data'}), 400
        
    from datetime import datetime
    try:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'message': 'Invalid date format. Use YYYY-MM-DD'}), 400

    invalid_students = []
    attendance_objects = [] # Buffer to avoid partial updates if validation fails

    for record in records:
        student_id = record.get('student_id')
        enrollment = Enrollment.query.filter_by(course_id=course_id, student_id=student_id).first()
        
        if not enrollment:
            invalid_students.append(student_id)
            continue
            
        existing = Attendance.query.filter_by(enrollment_id=enrollment.enrollment_id, date=date_obj).first()
        if existing:
            existing.status = record['status']
        else:
            new_att = Attendance(date=date_obj, status=record['status'], enrollment_id=enrollment.enrollment_id)
            db.session.add(new_att)
                
    if invalid_students:
        db.session.rollback() # Rollback any pending changes (like existing status updates)
        return jsonify({'message': f'Invalid or non-enrolled student IDs: {invalid_students}'}), 400

    db.session.commit()
    return jsonify({'message': 'Attendance marked successfully'}), 200

@faculty_bp.route('/analytics', methods=['GET'])
@token_required(roles=['faculty'])
def get_analytics(current_user):
    faculty = current_user.faculty_profile
    if not faculty:
         return jsonify({'message': 'No profile'}), 404
         
    courses = Course.query.filter_by(faculty_id=faculty.faculty_id).all()
    
    analytics = []
    for course in courses:
        enrollments = Enrollment.query.filter_by(course_id=course.course_id).all()
        total_students = len(enrollments)
        
        # Calculate classes recorded using the first student's attendance records (assuming same classes)
        total_classes = 0
        if enrollments:
            total_classes = Attendance.query.filter_by(enrollment_id=enrollments[0].enrollment_id).count()
            
        analytics.append({
            'course_id': course.course_id,
            'course_name': course.course_name,
            'total_students': total_students,
            'total_classes_recorded': total_classes
        })
        
    return jsonify(analytics), 200
