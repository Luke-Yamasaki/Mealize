from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Favorite, Post, User

favorites_routes = Blueprint('favorites', __name__)

@favorites_routes.route('/', methods=['POST'])
@login_required
def add_to_favorites():
    postId = request.json
    favorite = Favorite()
    favorite.user_id = current_user.id
    favorite.post_id = postId
    db.session.add(favorite)
    db.session.commit()
    return favorite.to_dict()


@favorites_routes.route('/', methods=['DELETE'])
@login_required
def removeFavorite():
    postId = request.json
    favorite = Favorite.query.get(int(postId))
    current_user.favorites.remove(favorite)
    db.session.commit()
    return favorite.to_dict()
