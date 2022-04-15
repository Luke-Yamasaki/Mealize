from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SelectField
from wtforms.fields.html5 import URLField
from wtforms.validators import InputRequired, Length

class RequestForm(FlaskForm):
    title = StringField("Title", validators=[InputRequired(),Length(min=5, max=35, message="Title must be between 5 and 35 characters long.") ])
    description = StringField("Description", validators=[InputRequired(), Length(min=10, max=255, message="Desctiptions must be between 10 and 255 characters long.")])
    quantity = StringField("Quantity", validators=[InputRequired()])
    categoryId = SelectField("Category", choices=[('1', 'Dairy'), ('2', 'Vegetables'), ('3', 'Fruits'), ('4', 'Grains'), ('5', 'Protein')], validators=[InputRequired()])
    expirationDate = DateField(format='%Y-%m-%d', validators=[InputRequired()])
