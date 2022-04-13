from .db import db

class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column()
    postId = db.Column()
    userId = db.Column()

    post = db.relationship('Post', back_populates='favorites')
    user = db.relationship('User', back_populates='favorites')

    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.postId,
            'userId': self.userId
        }
