from .db import db

class Delivery(db.Model):
    __tablename__ = 'deliveries'

    id = db.Column(db.Integer, primary_key=True)
    isDropoff = db.Column(db.Boolean, nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    businessId = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
    nonprofitId = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String, nullable=False)
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
            'businessId': self.businessId,
            'nonprofitId': self.nonprofitId,
            'postId': self.postId,
            'userId': self.userId,
            'date': self.date,
            'time': self.time,
            'post': self.post.to_dict(),
            'completed': self.completed,
            'cancellationReason': self.cancellationReason,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }

    def id_to_dict(self):
        return {
            'id': self.id
        }
