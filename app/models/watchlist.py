from .db import db

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    organizationId = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    ip = db.Column(db.String, nullable=False)
    count = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())

    organization = db.relationship('Organization', back_populates='watchlist')
    user = db.relationship('User', back_populates='watchlist')

    def to_dict(self):
        if self.organizationId == False:
            return {
                'id': self.id,
                'ip': self.ip,
                'count': self.count
            }
        else:
            return {
                'id': self.id,
                'organizationId': self.organizationId,
                'userId': self.userId,
                'ip': self.ip,
                'count': self.count
            }
