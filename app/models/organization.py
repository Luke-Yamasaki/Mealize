from .db import db

class Organization(db.Model):
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    federalId = db.Column(db.Integer, nullable=False)
    isNonprofit = db.Column(db.Boolean, nullable=False)
    logoUrl = db.Column(db.String(2048), nullable=False)
    imageUrl = db.Column(db.String(2048), nullable=False)
    open = db.Column(db.Time, nullable=False)
    close = db.Column(db.Time, nullable=False)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    street = db.Column(db.String(45), nullable=False)
    unit = db.Column(db.String(15), nullable=True)
    zip = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(17), nullable=False)
    state = db.Column(db.String(12), nullable=False)
    phone = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    employees = db.relationship('User', back_populates='organization', cascade='all, delete-orphan')
    posts = db.relationship('Post', back_populates='organization', cascade='all, delete-orphan')
    calendar = db.relationship('Calendar', back_populates='organization', cascade='all, delete-orphan')
    events = db.relationship('Event', back_populates='organization', cascade='all, delete-orphan')
    delivery = db.relationship('Delivery', back_populates='location')

    def to_dict(self):
        return {
            'id': self.id,
            'isNonprofit': self.isNonprofit,
            'logoUrl': self.logoUrl,
            'imageUrl': self.imageUrl,
            'open': self.open,
            'close': self.close,
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

    def updated_info(self):
        return {
            'id': self.id,
            'isNonprofit': self.isNonprofit,
            'logoUrl': self.logoUrl,
            'imageUrl': self.imageUrl,
            'open': self.open,
            'close': self.close,
            'name': self.name,
            'description': self.description,
            'street': self.street,
            'unit': self.unit,
            'zip': self.zip,
            'city': self.city,
            'state': self.state,
            'phone': self.phone,
            'email': self.email,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }


    def deleted_info(self):
        return {
            "id": self.id,
            "name": self.name
        }
