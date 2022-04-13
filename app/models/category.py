from .db import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(25), nullable=False)

    post = db.relationship('Post', back_populates='category')

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category
        }
