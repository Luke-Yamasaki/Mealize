from .db import db

class Delivery(db.Model):
    __tablename__ = 'deliveries'

    id = db.Column(db.Integer, primary_key=True)
    isDropoff = db.Column(db.Boolean, nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    start = db.Column(db.DateTime, nullable=False)
    end = db.Column(db.DateTime, nullable=False)
    completed = db.Column(db.Integer, nullable=False)
    cancellationReason = db.Column(db.String(255), nullable=True)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    post = db.relationship('Post', back_populates='delivery')
    volunteer = db.relationship('User', back_populates='delivery')

    def to_dict(self):
        return {
            'id': self.id,
            'isDropoff': self.isDropoff,
            'postId': self.postId,
            'userId': self.userId,
            'address': self.address,
            'start': self.start,
            'end': self.end,
            'completed': self.completed,
            'cancellationReason': self.cancellationReason,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }
