from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    isItem = db.Column(db.Boolean, nullable=False)
    organizationId = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(35), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.String(12), nullable=False)
    categoryId = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    imageUrl = db.Column(db.String(2048), nullable=False)
    expirationDate = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    organization = db.relationship('Organization', back_populates='posts')
    uploader = db.relationship('User', back_populates='posts')

    category = db.relationship('Category', back_populates='post')
    delivery = db.relationship('Delivery', back_populates='post')
    favorites = db.relationship('Favorite', back_populates='post')

    def to_dict(self):
        return {
            'id': self.id,
            'isItem': self.isItem,
            'organizationId': self.organizationId,
            'userId': self.userId,
            'title': self.title,
            'description': self.description,
            'quantity': self.quantity,
            'categoryId': self.categoryId,
            'imageUrl': self.imageUrl,
            'expirationDate': self.expirationDate,
            'endDate': self.endDate,
            'status': self.status,
            'organization': self.organization.to_dict(),
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

    def deleted_info(self):
        return {
            'id': self.id,
            'title': self.title
        }
