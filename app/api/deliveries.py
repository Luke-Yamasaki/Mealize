from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Delivery, Post
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
    times = ('9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '15.5', '16', '16.5')

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
        id = request.json['postId']
        post = Post.query.get(id)
        post.status = 1
        db.session.commit()

        delivery = Delivery(
            isDropoff = False,
            postId = request.json['postId'],
            userId = current_user.id,
            organizationId = current_user.organizationId,
            date = request.json['date'],
            time = form.data['time'],
            completed = 0 # 0=not approved yet 1=approved 2=accepted 3=picked up/droped off 4=cancelled
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
    year = strftime("%Y")
    month = strftime("%m")
    day = strftime("%d")
    times = ('9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '15.5', '16', '16.5')
    form_date = request.json['date']
    form_year = form_date[0:4]
    form_month = form_date[5:7]
    form_day = form_date[8:10]

    if form_year < year:
        return {'error': 'Invalid year.', 'message': 'Please do not try to break my app. I worked countless hours.'}
    elif form_year == year and form_month < month:
        return {'error': 'Invalid month.', 'message': 'Please do not try to break my app. I worked countless hours.'}
    elif form_year == year and form_month == month and form_day < day:
        return {'error': 'Invalid day.', 'message': 'Please do not try to break my app. I worked countless hours.'}
    elif not form.data['time'] in times:
        return {'error': 'Invalid timeslot.', 'message': 'Please do not try to break my app. I worked countless hours.'}
    elif form.data['time'] in times and form.validate_on_submit():
        delivery = Delivery.query.get(id)
        delivery.date = request.json['date'],
        delivery.time = form.data['time']
        db.session.commit()

        return delivery.to_dict()
    return {'errors': errors_to_list(form.errors)}

@delivery_routes.route('/approval/<int:id>', methods=['PUT'])
@login_required
def approve_delivery(id):
    if request.json['approval'] == 'approved':
        post_id = request.json['postId']
        post = Post.query.get(post_id)
        post.status = 2
        db.session.commit()

        delivery = Delivery.query.get(id)
        delivery.completed = 1
        db.session.commit()
        return delivery.to_dict()
    else:
        post_id = request.json['postId']
        post = Post.query.get(post_id)
        post.status = 0
        db.session.commit()

        delivery = Delivery.query.get(id)
        db.session.delete(delivery)
        db.session.commit()
        return id

@delivery_routes.route('/accept/<int:id>', methods=['PUT'])
@login_required
def accept_delivery(id):
    accepted_num = request.json['accepted']
    delivery = Delivery.query.get(id)
    delivery.completed = accepted_num
    db.session.commit()
    return delivery.to_dict()

@delivery_routes.route('/pickedup/<int:id>', methods=['PUT'])
@login_required
def pickedup_delivery(id):
    delivery = Delivery.query.get(id)
    delivery.completed = 3
    db.session.commit()

    post = Post.query.get(delivery.postId)
    post.status = 2
    db.session.commit()
    return delivery.to_dict()

@delivery_routes.route('/cancellation/<int:id>', methods=['PUT'])
@login_required
def cancel_delivery(id):
    delivery = Delivery.query.get(id)
    delivery.cancellationReason = request.json['cancellationReason']
    delivery.completed = 4
    db.session.commit()

    post = Post.query.get(delivery.postId)
    post.status = 0
    db.session.commit()

    return delivery.to_dict()

@delivery_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_delivery(id):
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
    deletedId = id
    delivery = Delivery.query.get(id)

    db.session.delete(delivery)
    db.session.commit()

    return str(deletedId)
