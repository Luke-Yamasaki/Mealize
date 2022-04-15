from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import InputRequired, Length

class DeliveryForm(FlaskForm):
    start = DateTimeField(validators=[InputRequired()])
    end = DateTimeField(validators=[InputRequired()])
    cancellationReason = StringField(validators=[InputRequired(), Length(min=1, max=255, message="Please state a cancellation reason in under 255 characters.")])
