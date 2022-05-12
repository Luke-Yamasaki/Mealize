from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, IntegerField, BooleanField, DateField
from wtforms.validators import InputRequired, Length, Email, ValidationError, EqualTo

# from app.stdnum.us.ein import *

from app.models import User

def existing_user(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('The email address you provided is already in use by another user.')

class SignupForm(FlaskForm):
    firstName = StringField('First Name', validators=[InputRequired(), Length(min=1, max=50, message='Sorry, we cannot store first names longer than 50 characters.')])
    lastName = StringField('Last Name', validators=[InputRequired(), Length(min=1, max=50, message='Sorry, we cannot store last names longer than 50 characters.')])
    dob = DateField("DOB", validators=[InputRequired()])
    organizationId = IntegerField("Organization Id", validators=[InputRequired()])
    email = StringField("Email",  validators=[InputRequired("Please provide your email address."), Email("Please provide a valid email address."), existing_user])
    phone = StringField("Phone number", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    confirm = PasswordField("Confirm password", validators=[InputRequired()])
