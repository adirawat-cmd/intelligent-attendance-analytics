from flask import Blueprint, request, jsonify
from extensions import db
from models import User, Course, Faculty, Student
from utils import token_required

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/users', methods=['POST'])
@token_required(roles=['admin'])
def create_user(current_user):
    data = request.get_json()
    try:
        new_user = User(
            name=data['name'],
            email=data['email'],
            password=data['password'],
            role=data['role']
        )
        db.session.add(new_user)
        db.session.flush() # To get user_id
        
        if data['role'] == 'student':
            student = Student(roll_no=data['roll_no'], department=data['department'], semester=data['semester'], user_id=new_user.user_id)
            db.session.add(student)
        elif data['role'] == 'faculty':
            faculty = Faculty(designation=data['designation'], department=data['department'], user_id=new_user.user_id)
            db.session.add(faculty)
            
        db.session.commit()
        return jsonify({'message': 'User created successfully', 'user': new_user.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 400

@admin_bp.route('/users', methods=['GET'])
@token_required(roles=['admin'])
def get_users(current_user):
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200

@admin_bp.route('/courses', methods=['POST'])
@token_required(roles=['admin'])
def create_course(current_user):
    data = request.get_json()
    new_course = Course(
        course_name=data['course_name'],
        credits=data['credits'],
        faculty_id=data.get('faculty_id')
    )
    db.session.add(new_course)
    db.session.commit()
    return jsonify({'message': 'Course created', 'course': new_course.to_dict()}), 201

@admin_bp.route('/courses/<int:id>', methods=['PUT', 'DELETE'])
@token_required(roles=['admin'])
def manage_course(current_user, id):
    course = Course.query.get_or_404(id)
    if request.method == 'PUT':
        data = request.get_json()
        if 'course_name' in data:
            course.course_name = data['course_name']
        if 'credits' in data:
            course.credits = data['credits']
        if 'faculty_id' in data:
            course.faculty_id = data['faculty_id']
        db.session.commit()
        return jsonify({'message': 'Course updated', 'course': course.to_dict()})
        
    if request.method == 'DELETE':
        db.session.delete(course)
        db.session.commit()
        return jsonify({'message': 'Course deleted'})
        
@admin_bp.route('/courses', methods=['GET'])
@token_required(roles=['admin'])
def get_courses(current_user):
    courses = Course.query.all()
    return jsonify([c.to_dict() for c in courses]), 200
