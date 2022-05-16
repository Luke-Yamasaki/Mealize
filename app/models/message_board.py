from .db import db
from datetime import datetime

class Messageboard(db.Model):
    __tablename__ = 'message_boards'

    id = db.Column(db.Integer, primary_key=True)
    user_one = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_two = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())

    messages = db.relationship('Message', back_populates='message_board', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_one': self.user_one,
            'user_two': self.user_two,
            'messages': [message.to_dict() for message in self.messages],
            'createdAt': self.createdAt
        }

    def deleted_info(self):
        return {
            'id': self.id,
            'deletedAt': datetime.now()
        }
