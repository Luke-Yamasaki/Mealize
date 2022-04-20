from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, IntegerField, BooleanField
from wtforms.validators import InputRequired, Length, Email, ValidationError, EqualTo, NumberRange
from flask_wtf.file import FileField, FileRequired, FileAllowed
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
    profileImageUrl = FileField('Profile image', validators=[FileRequired(), FileAllowed(['jpg', 'jpeg', 'png'], 'We can only accept images in .jpg or .png format.')])
    jobDescription = StringField('Job description', validators=[InputRequired(), Length(max=255, message='Sorry, job descriptions must be less than 255 characters.')])
    age = IntegerField("Age", validators=[InputRequired(), NumberRange(min=18, max=100)])
    deaf = BooleanField("Deaf", validators=[InputRequired()])
    autism = BooleanField("Deaf", validators=[InputRequired()])
    learningDisabled = BooleanField("Deaf", validators=[InputRequired()])
    lgbtq = BooleanField("LGBTQ", validators=[InputRequired()])
    organizationId = IntegerField("Organization Id", validators=[InputRequired()])
    isNonprofit = BooleanField("Nonprofit", validators=[InputRequired()])
    isManager = BooleanField("Manager", validators=[InputRequired()])
    email = StringField("Email",  validators=[InputRequired("Please provide your email address."), Email("Please provide a valid email address."), existing_user])
    phone = PhoneNumberField("Phone number", region='US', display_format='national', validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired("Please provide your password."), EqualTo('confirm', message="The passwords you provided do not match.")])
    confirm = PasswordField("Confirm password", validators=[InputRequired()])
