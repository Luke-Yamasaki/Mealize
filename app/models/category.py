from .db import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(25), nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    posts = db.relationship('Post', back_populates='category')

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'posts': {post.id:post.to_dict() for post in self.posts}
        }
