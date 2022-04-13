from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    isItem = db.Column(db.Boolean, nullable=False)
    organizationId = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(35), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    categoryId = db.Column(db.Integer, nullable=False)
    imageUrl = db.Column(db.String(2048), nullable=False)
    expirationDate = db.Column(db.DateTime, nullable=False)
    endDate = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    organization = db.relationship('Organization', back_populates='posts')
    uploader = db.relationship('User', back_populates='posts')

    def to_dict(self):
        return {
            
        }
