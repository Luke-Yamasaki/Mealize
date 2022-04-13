from .db import db

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    organizationId = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
    isClosed = db.Column(db.DateTime, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    imageUrl = db.Column(db.String(2048))
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    organization = db.relationship('Organization', back_populates='event')

    def to_dict(self):
        return {
            'id': self.id,
            'organizationId': self.organizationId,
            'userId': self.userId,
            'isClosed': self.isClosed,
            'title': self.title,
            'description': self.description,
            'date': self.date,
            'imageUrl': self.imageUrl,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
