from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired, Length
from flask_wtf.file import FileField, FileAllowed

class MessageForm(FlaskForm):
    content = StringField("Content", validators=[InputRequired(), Length(min=10, max=1000, message='The maximum allowed length is 1000 characters.')])
    imageUrl = FileField("Image", validators=[FileAllowed(['jpg', 'jpeg', 'png'])])
    postId = IntegerField('PostId')
