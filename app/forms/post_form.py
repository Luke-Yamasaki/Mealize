from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SelectField
from wtforms.validators import InputRequired, Length


class PostForm(FlaskForm):
    title = StringField("Title", validators=[InputRequired(),Length(min=3, max=25, message="Titles must be less than 35 characters long.") ])
    description = StringField("Description", validators=[InputRequired(), Length(min=3, max=120, message="Desctiptions must be less than 255 characters long.")])
    quantity = StringField("Quantity", validators=[InputRequired()])
    categoryId = SelectField("Category", choices=[('1', 'Dairy'), ('2', 'Vegetables'), ('3', 'Fruits'), ('4', 'Grains'), ('5', 'Protein')], validators=[InputRequired()])
    expDate = DateField("Expiration date", format='%Y-%m-%d', validators=[InputRequired()])
