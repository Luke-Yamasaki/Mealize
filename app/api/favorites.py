from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Favorite, Post, User

favorites_routes = Blueprint('favorites', __name__)

@favorites_routes.route('/', methods=['POST'])
@login_required
def add_to_favorites():
    postId = request.json
    favorite = Favorite(
        postId = postId,
        userId = current_user.id
    )
    db.session.add(favorite)
    db.session.commit()
    return favorite.to_dict()


@favorites_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def removeFavorite(id):
    favorite = Favorite.query.get(id)
    postId = favorite.postId
    db.session.delete(favorite)
    db.session.commit()
    return str(postId)
