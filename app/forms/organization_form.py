from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, BooleanField, TimeField, SelectField
from wtforms.fields.html5 import URLField
from wtforms_alchemy import PhoneNumberField
from wtforms.validators import InputRequired, ValidationError, Email, Length, NumberRange
from app.models import Organization

def existing_organization(form, field):
    email = field.data
    organization = Organization.query.filter(Organization.email == email).first()
    if organization:
        raise ValidationError('The email address you provided is already in use by another organization.')

def image_validation(form, field):
    img_url = field.data
    if not (img_url.endswith('.jpg') or img_url.endswith('.jpeg') or img_url.endswith('.png')):
        raise ValidationError('Sorry, we can only accept .jpg, .jpeg or .png image formats.')

class OrganizationForm(FlaskForm):
    federalId = IntegerField("EIN", validators=[InputRequired(), NumberRange(min=9, max=9, message="EIN must be nine digits long.")])
    nonprofit = BooleanField("Nonprofit", validators=[InputRequired()])
    name = StringField("Name", validators=[InputRequired(), Length(min=1, max=30, message="Organization names must be shorter than 30 characters.")])
    street = StringField("Street", validators=[InputRequired(), Length(min=5, max=45, message="Street names must be shorter than 45 characters.")])
    unit = StringField("Unit", validators=[Length(min=1, max=15, message='Unit information must be between 1 and 15 characters long.')])
    zip = StringField("Zip code", validators=[InputRequired(), NumberRange(min=5, max=9)])
    city = StringField("City", validators=[InputRequired(), Length(min=3, max=17, message="City names cannot be shorter than three characters or longer than 17 characters.")])
    state = StringField("State", validators=[InputRequired(), Length(min=4, max=12)])
    description = StringField("Description", validators=[InputRequired(), Length(min=30, max=255, message="Please provide a description of your organization between 30 and 255 characters.")])
    phone = PhoneNumberField("Phone number", region='US', display_format='national', validators=[InputRequired()])
    email = StringField("Email", validators=[InputRequired(), Email("Please provide a valid email address."), existing_organization])
    website = StringField("Website", validators=[InputRequired(), Length(min=4, max=70, message='Website URLs must be between 4 and 70 characters long.')])
    open = TimeField("Open", validators=[InputRequired()])
    close = TimeField("Close", validators=[InputRequired()])
    timeslot = SelectField("Available timeslots", choices=[('Morning', '9AM-10:30AM'), ('Noon', '11AM-12:30PM'), ('Early afternoon', '1PM-2PM'), ('Late afternoon', '2:30PM-4PM')], validators=[InputRequired()])
    logoUrl = URLField("Logo", validators=[InputRequired(), Length(min=4, max=2048, message="Please provide an image URL that is between 4 and 2048 characters long."), image_validation])
    imageUrl = URLField("Banner image", validators=[InputRequired(), Length(min=4, max=2048, message="Please provide an image URL that is between 4 and 2048 characters long."), image_validation])
