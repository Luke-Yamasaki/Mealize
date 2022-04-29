from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Delivery
from app.forms.delivery_form import DeliveryForm
from app.utils import errors_to_list
from time import strftime

delivery_routes = Blueprint('deliveries', __name__)

@delivery_routes.route('/')
@login_required
def all_deliveries():
    deliveries = Delivery.query.filter(Delivery.userId == current_user.id)
    return {delivery.id:delivery.to_dict() for delivery in deliveries}

@delivery_routes.route('/<int:id>')
@login_required
def delivery(id):
    delivery = Delivery.query.get(id)
    return delivery.to_dict()

@delivery_routes.route('/', methods=['POST'])
@login_required
def new_delivery():
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
    form = DeliveryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    year = strftime("%Y")
    month = strftime("%m")
    day = strftime("%d")
    # tuples are immutable
    times = ('9AM', '9:30AM', '10AM', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '15.5', '16', '16.5')

    # For some reason, form.data['date'] does not work.
    form_date = request.json['date']
    form_year = form_date[0:4]
    form_month = form_date[5:7]
    form_day = form_date[8:10]

    # Check date and time for past
    if form_year < year:
        return {'error': 'Invalid year.', 'message': 'Please do not try to break my app. I worked countless hours.'}
    elif form_year == year and form_month < month:
        return {'error': 'Invalid month.', 'message': 'Please do not try to break my app. I worked countless hours.'}
    elif form_year == year and form_month == month and form_day < day:
        return {'error': 'Invalid day.', 'message': 'Please do not try to break my app. I worked countless hours.'}
    elif not form.data['time'] in times:
        return {'error': 'Invalid timeslot.', 'message': 'Please do not try to break my app. I worked countless hours.'}
    elif form.data['time'] in times and form.validate_on_submit():
        delivery = Delivery(
            isDropoff = False,
            postId = request.json['postId'],
            userId = current_user.id,
            organizationId = current_user.organizationId,
            date = request.json['date'],
            time = form.data['time'],
            completed = 0 # 0=not approved yet 1=accepted 2=in progress 3=picked up/droped off 4=cancelled
        )
        db.session.add(delivery)
        db.session.commit()
        return delivery.to_dict()
    return {'errors': errors_to_list(form.errors)}

@delivery_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_delivery(id):
    form = DeliveryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if len(form.data['cancellationReason']) > 1:
            delivery = Delivery(
                isDropoff = request.json['isDropoff'],
                postId = request.json['postId'],
                userId = current_user.id,
                organizationId = request.json['organizationId'],
                date = form.data['date'],
                time = form.data['time'],
                cancellationReason = form.data['cancellationReason'],
                completed = 4 #  0=not apprevoded yet 1=accepted 2=in progress 3=picked up/droped off 4=cancelled
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
                completed = 0 #  0=not apprevoded yet 1=accepted 2=in progress 3=picked up/droped off 4=cancelled
            )
            db.session.add(delivery)
            db.session.commit()
            return delivery.to_dict()
    return {'errors': errors_to_list(form.errors)}
