from flask_wtf import FlaskForm
from wtforms import StringField, DateField, BooleanField
from wtforms.validators import InputRequired, Length

class EventForm(FlaskForm):
   isClosed = BooleanField("Closed", validators=[InputRequired()])
   title = StringField("Title", validators=[InputRequired(), Length(min=5, max=50, message="Titles must be between 5 and 50 characters long.")])
   description = StringField("Description", validators=[InputRequired(), Length(min=30, max=255, message="Please provide a description between 30 and 255 characters.")])
   date = DateField("Date", validators=[InputRequired()])
