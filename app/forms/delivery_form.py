from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import InputRequired, Length

class DeliveryForm(FlaskForm):
    date = DateField('Delivery date', format="%Y-%m-%d", validators=[InputRequired()])
    time = StringField('Delivery time', validators=[InputRequired()])
    cancellationReason = StringField(validators=[Length(min=1, max=255, message="Please state a cancellation reason in under 255 characters.")])
