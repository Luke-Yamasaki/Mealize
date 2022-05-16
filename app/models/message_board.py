from .db import db
from datetime import datetime

class Messageboard(db.Model):
    __tablename__ = 'message_boards'

    id = db.Column(db.Integer, primary_key=True)
    createdAt = db.Column(db.DateTime, default=db.func.now())

    messages = db.relationship('Message', back_populates='message_board', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'messages': {message.id:message.to_dict() for message in self.messages},
            'createdAt': self.createdAt
        }

    def deleted_info(self):
        return {
            'id': self.id,
            'deletedAt': datetime.now()
        }
