from flask import Blueprint, request
from flask import jsonify
from flask_login import current_user
from app.utils import errors_to_list
from app.models import db, Watchlist

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route("/warning", methods=["POST"])
def get_client_ip():
    ip_address = jsonify({'ip': request.remote_addr}), 200
    if not current_user:
        user = Watchlist(
            ip = ip_address
        )
        db.session.add(user)
        db.session.commit()
        return {'warning': 'You are receiving a warning because you violated the community rules.'}
    else:
        user = Watchlist(
            ip = ip_address,
            organizationId = current_user.organizationId,
            userId = current_user.id
        )
        db.session.add(user)
        db.session.commit()
        return {'warning': 'You are receiving a warning because you violated the community rules.'}

@watchlist_routes.route("/warning", methods=["POST"])
def get_client_ip():
    ip_address = jsonify({'ip': request.remote_addr}), 200
    if not current_user:
        user = Watchlist(
            ip = ip_address
        )
        db.session.add(user)
        db.session.commit()
        return {'warning': 'You are receiving a warning because you violated the community rules.'}
    else:
        user = Watchlist(
            ip = ip_address,
            organizationId = current_user.organizationId,
            userId = current_user.id
        )
        db.session.add(user)
        db.session.commit()
        return {'warning': 'You are receiving a warning because you violated the community rules.'}

@watchlist_routes.route("/blacklist", methods=["POST"])
def get_client_ip():
    ip_address = jsonify({'ip': request.remote_addr}), 200
    if not current_user:
        user = Watchlist(
            ip = ip_address
        )
        db.session.add(user)
        db.session.commit()
        return {'warning': 'You are receiving a warning because you violated the community rules.'}
    else:
        user = Watchlist(
            ip = ip_address,
            organizationId = current_user.organizationId,
            userId = current_user.id
        )
        db.session.add(user)
        db.session.commit()
        return {'warning': 'You are receiving a warning because you violated the community rules.'}
