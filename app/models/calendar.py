from .db import db

class Calendar(db.Model):
    __tablename__ = 'calendars'

    id = db.Column(db.Integer, primary_key=True)
    organizationId = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
    open = db.Column(db.DateTime, nullable=False)
    close = db.Column(db.DateTime, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    organization = db.relationship('Organization', back_populates='calendar')

    def to_dict(self):
        return {
            'id': self.id,
            'organizationId': self.organizationId,
            'open': self.open,
            'close': self.close
        }
