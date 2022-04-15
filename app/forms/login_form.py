from ast import Pass
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, ValidationError, Email
from app.models import User

def existing_user(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError("Hmm... we could not find that email in our database.")

def matching_password(form, field):
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError("Hmm... we could not find a user with the provided email address.")
    if not user.check_password(password):
        raise ValidationError("The password you provided is incorrect.")

class LoginForm(FlaskForm):
    email = StringField("Email",  validators=[InputRequired("Please provide your email address."), Email("Please provide a valid email address."), existing_user])
    password = PasswordField("Password", validators=[InputRequired("Please provide your password."), matching_password])
