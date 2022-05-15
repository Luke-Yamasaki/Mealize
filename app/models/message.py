from .db import db
from datetime import datetime

message_sender = db.Table(
    "message_sender",
    db.Column("messageId", db.ForeignKey("messages.id"), primary_key=True),
    db.Column("senderId", db.ForeignKey("users.id"), primary_key=True)
)

message_receiver = db.Table(
    "message_receiver",
    db.Column("messageId", db.ForeignKey("messages.id"), primary_key=True),
    db.Column("receiverId", db.ForeignKey("users.id"), primary_key=True)
)

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    senderId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiverId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=True)
    content = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=True)
    createdAt = db.Column(db.DateTime, default=db.func.now())

    sender = db.relationship('User', foreign_keys=[senderId], back_populates='sent_messages')
    receiver = db.relationship('User', foreign_keys=[receiverId], back_populates='received_messages')
    post = db.relationship('Post', back_populates='message')
    # recipient and sender

    def to_dict(self):
        return {
            'id': self.id,
            'senderId': self.senderId,
            'receiverId': self.receiverId,
            'postId': self.postId,
            'content': self.content,
            'imageUrl': self.imageUrl,
            'createdAt': self.createdAt,
        }

    def deleted_info(self):
        return {
            'id': self.id,
            'deletedAt': datetime.now()
        }
