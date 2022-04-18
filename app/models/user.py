from .db import db
from .message import Message
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    organizationId = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
    isNonprofit = db.Column(db.Boolean, nullable=False)
    isManager = db.Column(db.Boolean, nullable=False)
    private = db.Column(db.Boolean, nullable=False)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=False, unique=True)
    age = db.Column(db.Integer, nullable=False)
    deaf = db.Column(db.Boolean, nullable=False)
    autism = db.Column(db.Boolean, nullable=False)
    learningDisabled = db.Column(db.Boolean, nullable=False)
    lgbtq = db.Column(db.Boolean, nullable=False)
    profileImageUrl = db.Column(db.String(2048), nullable=False)
    jobDescription = db.Column(db.String(255), nullable=False)
    hashedPassword = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    organization = db.relationship('Organization', back_populates='employees')
    posts = db.relationship('Post', back_populates='uploader', cascade='all, delete-orphan')
    delivery = db.relationship('Delivery', back_populates='volunteer', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='user', cascade='all, delete-orphan')
    sent_messages = db.relationship('Message', back_populates='sender', foreign_keys=[Message.senderId], cascade='all, delete-orphan')
    received_messages = db.relationship('Message', back_populates='receiver', foreign_keys=[Message.receiverId], cascade='all, delete-orphan')
    events = db.relationship('Event', back_populates='manager', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashedPassword, password)

    def home_dict(self):
        return {
            'id': self.id,
            'organizationId': self.organizationId,
            'profileImageUrl': self.profileImageUrl,
            'firstName': self.firstName,
            'lastName': self.lastName,
        }

    def profile_dict(self):
        if self.private == True:
            return {
                'id': self.id,
                'organizationId': self.organizationId,
                'isNonprofit': self.isNonprofit,
                'isManager': self.isManager,
                'profileImageUrl': self.profileImageUrl,
                'firstName': self.firstName,
                'lastName': self.lastName,
                'jobDescription': self.jobDescription,
                'createdAt': self.createdAt
            }
        else:
            return {
            'id': self.id,
            'organizationId': self.organizationId,
            'isNonprofit': self.isNonprofit,
            'isManager': self.isManager,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'phone': self.phone,
            'profileImageUrl': self.profileImageUrl,
            'jobDescription': self.jobDescription,
            'createdAt': self.createdAt
        }
