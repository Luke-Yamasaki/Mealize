from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm, SignupForm
from flask_login import current_user, login_user, logout_user
from app.utils import errors_to_list
from app.utils.s3 import accepted_file, generate_unique_file, upload_to_s3_bucket

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.profile_dict()
    return {'errors': ['Unauthorized']}

@auth_routes.route('/images', methods=['POST'])
def image_validation():
    print('////////////request.file', request.files)
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]
    print('///////////////image', image)

    if not accepted_file(image.filename):
        print('////////////image.filename', image.filename)
        return {"errors": "file type not permitted"}, 400

    image.filename = generate_unique_file(image.filename)

    upload = upload_to_s3_bucket(image)
    if "url" not in upload:
        print('//////////////upload', upload)
        return upload, 400

    imageUrl = upload["url"]

    return {"imageUrl": imageUrl}

@auth_routes.route('/validate', methods=['POST'])
def form_validation():
    form = SignupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        return {'message': 'success'}
    return {'errors': errors_to_list(form.errors)}

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            organizationId = form.data['organizationId'],
            isNonprofit = request.json['isNonprofit'],
            isManager = request.json['isManager'],
            firstName = form.data['firstName'],
            lastName = form.data['lastName'],
            email = form.data['email'],
            phone = form.data['phone'],
            dob = form.data['dob'],
            deaf = request.json['deaf'],
            wheelchair = request.json['wheelchair'],
            learningDisabled = request.json['learningDisabled'],
            lgbtq = request.json['lgbtq'],
            profileImageUrl = request.json['profileImageUrl'],
            password = form.data['confirm']
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.profile_dict()
    return {'errors': errors_to_list(form.errors)}, 401

@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.profile_dict()
    return {'errors': errors_to_list(form.errors)}, 401

@auth_routes.route('/logout')
def logout():
    logout_user()
    return {'message': 'The user has logged out.'}

@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401
