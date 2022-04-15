from flask_wtf import FlaskForm
from wtforms import TimeField
from wtforms.validators import InputRequired

class CalendarForm(FlaskForm):
    open = TimeField("Open", validators=[InputRequired()])
    close = TimeField("Close", validators=[InputRequired()])
