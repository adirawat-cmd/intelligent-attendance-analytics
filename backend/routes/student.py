from flask import Blueprint, request, jsonify
from extensions import db
from models import Attendance, Enrollment
from utils import token_required

student_bp = Blueprint('student', __name__)

@student_bp.route('/attendance', methods=['GET'])
@token_required(roles=['student'])
def get_attendance(current_user):
    student = current_user.student_profile
    if not student:
        return jsonify({'message': 'Student profile not found'}), 404
        
    enrollments = Enrollment.query.filter_by(student_id=student.student_id).all()
    results = []
    for e in enrollments:
        attendances = Attendance.query.filter_by(enrollment_id=e.enrollment_id).all()
        for a in attendances:
            att_dict = a.to_dict()
            att_dict['course_name'] = e.course.course_name
            results.append(att_dict)
        
    return jsonify(results), 200

@student_bp.route('/attendance/summary', methods=['GET'])
@token_required(roles=['student'])
def get_attendance_summary(current_user):
    student = current_user.student_profile
    if not student:
        return jsonify({'message': 'Student profile not found'}), 404
        
    enrollments = Enrollment.query.filter_by(student_id=student.student_id).all()
    summary = []
    for e in enrollments:
        attendances = Attendance.query.filter_by(enrollment_id=e.enrollment_id).all()
        total_classes = len(attendances)
        present = sum(1 for a in attendances if a.status.lower() == 'present')
        percentage = (present / total_classes * 100) if total_classes > 0 else 0
        
        summary.append({
            'course_id': e.course_id,
            'course_name': e.course.course_name,
            'total_classes': total_classes,
            'attended': present,
            'percentage': round(percentage, 2),
            'eligible': percentage >= 75.0
        })
        
    return jsonify(summary), 200
