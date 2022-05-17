from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired, Length

class MessageForm(FlaskForm):
    content = StringField("Content", validators=[InputRequired(), Length(min=2, max=1000, message='The maximum allowed length is 1000 characters.')])
    postId = IntegerField('PostId')
