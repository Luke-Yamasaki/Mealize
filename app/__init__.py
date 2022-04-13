import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import genereate_csrf
from flask_login import LoginManager

from app.models import db, User

from .config import Config

app = Flask(__name__)

login = LoginManager(app)
login.login_view = 'auth.unauthorized'
