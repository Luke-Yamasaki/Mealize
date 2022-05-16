from .db import db
from datetime import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    boardId = db.Column(db.Integer, db.ForeignKey('message_boards.id'), nullable=False)
    senderId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=True)
    content = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=True)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    message_board = db.relationship('Messageboard', back_populates='messages')
    post = db.relationship('Post', back_populates='message')
    sender = db.relationship('User', back_populates='sent_messages')

    def to_dict(self):
        return {
            'id': self.id,
            'boardId': self.boardId,
            'senderId': self.senderId,
            'postId': self.postId,
            'content': self.content,
            'imageUrl': self.imageUrl,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

    def deleted_info(self):
        return {
            'id': self.id,
            'deletedAt': datetime.now()
        }
