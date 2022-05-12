from flask import Blueprint, request, jsonify
from flask_login import current_user
from app.models import db, Watchlist

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route("/warning", methods=["POST"])
def get_client_ip():
    ip_address = jsonify({'ip': request.remote_addr}), 200
    if not current_user:
        user = Watchlist(
            ip = ip_address,
            count = 1
        )
        db.session.add(user)
        db.session.commit()
        return {'warning': 'You are receiving a warning because you violated the community rules.'}
    else:
        user = Watchlist(
            ip = ip_address,
            organizationId = current_user.organizationId,
            userId = current_user.id,
            count = 1
        )
        db.session.add(user)
        db.session.commit()
        return {'warning': 'You are receiving a warning because you violated the community rules.'}

@watchlist_routes.route("/repeat", methods=["PUT"])
def repeat_offense():
    userId = current_user.id
    user = Watchlist.query.get(userId)
    user.count = 2
    db.session.commit()
    return {'warning': 'You have no more warnings left. If you violate our community standards, you will be banned from Mealize.'}

@watchlist_routes.route("/apologized", methods=["PUT"])
def apologized():
    userId = request.json['userId']
    user = Watchlist.query.get(userId)
    user.count = 1
    db.session.commit()
    return {'message': 'Thank you for doing the right thing, we appreciate it. Please continue to be good to others.'}


@watchlist_routes.route("/blacklist", methods=["PUT"])
def add_to_blacklist():
    userId = current_user.id
    user = Watchlist.query.get(userId)
    user.count = 3
    db.session.commit()
    return {'message': 'You are now banned from Mealize. Be good to others.'}

@watchlist_routes.route("/blacklist", methods=["POST"])
def ban_user():
    ip_address = request.json['Ip']
    user = Watchlist(
        ip = ip_address,
        count = 3
    )
    db.session.add(user)
    db.session.commit()
    return {'message': 'You are now banned from Mealize. Be good to others.'}
