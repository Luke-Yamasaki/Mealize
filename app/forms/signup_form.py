from flask_wtf import FlaskForm
from flask_wtf.html5 import URLField
from wtforms import StringField, PasswordField, IntegerField, BooleanField
from wtforms.validators import InputRequired, Length, Email, ValidationError, EqualTo, NumberRange, url
from wtforms_alchemy import PhoneNumberField

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
    profileImageUrl = URLField('Profile image', validators=[InputRequired(), url(), Length(max=2048, message='Sorry, the URL is too long.')])
    jobDescription = StringField('Job description', validators=[InputRequired(), Length(max=255, message='Sorry, job descriptions must be less than 255 characters.')])
    dob = IntegerField("DOB", validators=[InputRequired(), NumberRange(min=18, max=100)])
    deaf = BooleanField("Deaf")
    autism = BooleanField("Deaf")
    learningDisabled = BooleanField("Deaf")
    lgbtq = BooleanField("LGBTQ")
    organizationId = IntegerField("Organization Id", validators=[InputRequired()])
    isNonprofit = BooleanField("Nonprofit", validators=[InputRequired()])
    isManager = BooleanField("Manager", validators=[InputRequired()])
    email = StringField("Email",  validators=[InputRequired("Please provide your email address."), Email("Please provide a valid email address."), existing_user])
    phone = PhoneNumberField("Phone number", region='US', display_format='national', validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired("Please provide your password."), EqualTo('confirm', message="The passwords you provided do not match.")])
    confirm = PasswordField("Confirm password", validators=[InputRequired()])
