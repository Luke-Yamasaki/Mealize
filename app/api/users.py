from flask import Blueprint
from app.models import User

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def users():
    all_users = User.query.all()
    return {'users': [user.home_dict() for user in all_users]}

@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.profile_dict()
