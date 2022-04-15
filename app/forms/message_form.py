from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired, Length
from flask_wtf.file import FileField, FileAllowed

class MessageForm(FlaskForm):
    content = StringField("Content", validators=[InputRequired(), Length(min=10, max=255, message='Please provide a message between 10 and 255 characters.')])
    imageUrl = FileField("Image", validators=[FileAllowed(['jpg', 'jpeg', 'png'])])
