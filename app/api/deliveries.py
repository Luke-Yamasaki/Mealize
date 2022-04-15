from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Delivery
from app.forms.delivery_form import DeliveryForm
from app.utils import errors_to_list

delivery_routes = Blueprint('deliveries', __name__)

@delivery_routes.route('/')
@login_required
def all_deliveries():
    organizationId = request.json['organizationId']
    all_deliveries = Delivery.query.filter(Delivery.organizationId == organizationId)
    return {'deliveries': [delivery.to_dict() for delivery in all_deliveries]}

@delivery_routes.routes('/<int:id>')
@login_required
def delivery(id):
    delivery = Delivery.query.get(id)
    return delivery.to_dict()

@delivery_routes.route('/', methods=['POST'])
@login_required
def new_delivery():
    isManager = current_user.isManager
    if isManager == False:
        return {'error': 'You are not authorized for this action.'}
    form = DeliveryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        delivery = Delivery(
            isDropoff = request.json['isDropoff'],
            postId = request.json['postId'],
            userId = current_user.id,
            organizationId = request.json['organizationId'],
            start = form.data['start'],
            end = form.data['end'],
            cancellationReason = form.data['cancellationReason'],
            completed = 0 # 0=accepted 1=in progress 2=picked up/droped off
        )
        db.session.add(delivery)
        db.session.commit()
        return delivery.to_dict()
    return {'errors': errors_to_list(form.errors)}

@delivery_routes.route('/', methods=['PUT'])
@login_required
def update_delivery():
    form = DeliveryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if len(form.data['cancellationReason']) > 1:
            cancelled = 3
            delivery = Delivery(
                isDropoff = request.json['isDropoff'],
                postId = request.json['postId'],
                userId = current_user.id,
                organizationId = request.json['organizationId'],
                start = form.data['start'],
                end = form.data['end'],
                cancellationReason = form.data['cancellationReason'],
                completed = cancelled # 0=accepted 1=in progress 2=picked up/droped off 3=cancelled
            )
            db.session.add(delivery)
            db.session.commit()
            return delivery.to_dict()
        else:
            delivery = Delivery(
                isDropoff = request.json['isDropoff'],
                postId = request.json['postId'],
                userId = current_user.id,
                organizationId = request.json['organizationId'],
                start = form.data['start'],
                end = form.data['end'],
                cancellationReason = form.data['cancellationReason'],
                completed = 1 # 0=accepted 1=in progress 2=picked up/droped off 3=cancelled
            )
            db.session.add(delivery)
            db.session.commit()
            return delivery.to_dict()
    return {'errors': errors_to_list(form.errors)}

