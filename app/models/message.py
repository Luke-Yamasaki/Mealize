from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    senderId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiverId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=True)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    user = db.relationship('User', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'senderId': self.senderId,
            'receiverId': self.receiverId,
            'content': self.content,
            'imageUrl': self.imageUrl,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }
