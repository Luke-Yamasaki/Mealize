from flask import Blueprint
from app.models import User

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def users():
    all_users = User.query.all()
    return {user.id:user.to_dict() for user in all_users}

@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict()
