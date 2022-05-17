from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import InputRequired

class DeliveryForm(FlaskForm):
    date = DateField('Delivery date', format="%Y-%m-%d", validators=[InputRequired()])
    time = StringField('Delivery time', validators=[InputRequired()])
