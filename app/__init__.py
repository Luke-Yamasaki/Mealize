import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.users import user_routes
from .api.authentication import auth_routes
from .api.organizations import organization_routes
from .api.categories import category_routes
from .api.posts import post_routes
from .api.messages import message_routes
from .api.deliveries import delivery_routes
from .api.favorites import favorites_routes
from .api.events import event_routes
from .api.watchlist import watchlist_routes

from .seeds import seed_group

from .config import Config

app = Flask(__name__)

login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

app.cli.add_command(seed_group)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(organization_routes, url_prefix='/api/organizations')
app.register_blueprint(category_routes, url_prefix='/api/categories')
app.register_blueprint(post_routes, url_prefix='/api/posts')
app.register_blueprint(message_routes, url_prefix='/api/messages')
app.register_blueprint(delivery_routes, url_prefix='/api/deliveries')
app.register_blueprint(event_routes, url_prefix='/api/events')
app.register_blueprint(favorites_routes, url_prefix='/api/favorites')
app.register_blueprint(watchlist_routes, url_prefix='/api/watchlist')

db.init_app(app)
Migrate(app, db)

CORS(app)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response

@app.errorhandler(405)
def bad_method(e):
    return {'message': ['Method not allowed']}, 405


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
