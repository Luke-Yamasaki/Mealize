from .db import db

class Organization(db.Model):
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    federalId = db.Column(db.Integer, nullable=False)
    isNonprofit = db.Column(db.Boolean, nullable=False)
    logoUrl = db.Column(db.String(2048), nullable=False)
    imageUrl = db.Column(db.String(2048), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    street = db.Column(db.String(100), nullable=False)
    unit = db.Column(db.String(50), nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(35), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    employees = db.relationship('User', back_populates='organization')
    posts = db.relationship('Post', back_populates='organization')
    calendar = db.relationship('Calendar', back_populates='organization')
    events = db.relationship('Event', back_populates='organization')

    def to_dict(self):
        return {
            'isNonprofit': self.isNonprofit,
            'logoUrl': self.logoUrl,
            'imageUrl': self.imageUrl,
            'name': self.name,
            'description': self.description,
            'street': self.street,
            'unit': self.unit,
            'zip': self.zip,
            'city': self.city,
            'state': self.state,
            'phone': self.phone,
            'email': self.email,
            'createdAt': self.createdAt
        }
