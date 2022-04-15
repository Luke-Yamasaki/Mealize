from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm, SignupForm
from flask_login import current_user, login_user, logout_user
from app.utils import errors_to_list

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.profile_dict()

@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.profile_dict()
    return {'errors': errors_to_list(form.errors)}, 401

@auth_routes.route('logout')
def logout():
    logout_user()
    return {'message': 'The user has logged out.'}

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignupForm()
    form['cesrf_token'].data = request.cookies['cerf_token']
    if form.validate_on_submit():
        # Add AWS S3 function to send profileImageUrl to bucket and retrieve new url string
        user = User(
            organizationId = request.json['organizationId'],
            isNonprofit = request.json['isNonprofit'],
            isManager = request.json['isManager'],
            private = request.json['private'],
            firstName = form.data['firstName'],
            lastName = form.data['lastName'],
            email = form.data['email'],
            phone = form.data['phone'],
            age = form.data['age'],
            deaf = form.data['deaf'],
            autism = form.data['autism'],
            learningDisabled = form.data['learningDisabled'],
            lgbtq = form.data['lgbtq'],
            profileImageUrl = form.data['profileImageUrl'],
            jobDescription = form.data['jobDescription'],
            password = form.data['password']
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.profile_dict()
    return {'errors': errors_to_list(form.errors)}, 401



@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401
