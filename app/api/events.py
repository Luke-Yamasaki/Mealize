from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Event
from app.forms.event_form import EventForm
from app.utils import errors_to_list

event_routes = Blueprint('events', __name__)

@event_routes.route('/')
def all_events():
    all_events = Event.query.all()
    return {'events': {event.id:event.to_dict() for event in all_events}}

@event_routes.routes('/<int:id>')
def event(id):
    event = Event.query.get(id)
    return event.to_dict()

@event_routes.route('/', methods=['POST'])
@login_required
def new_event():
    isManager = current_user.isManager
    if isManager == False:
        return {'error': 'You are not authorized for this action.'}
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event(
            organizationId = current_user.organizationId,
            userId = current_user.id,
            isClosed = request.json['isClosed'],
            title = form.data['title'],
            description = form.data['description'],
            date = form.data['date'],
            imageUrl = form.data['imageUrl']
        )
        db.session.add(event)
        db.session.commit()
        return event.to_dict()
    return {'errors': errors_to_list(form.errors)}

@event_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_event(id):
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event.query.get(id)
        event.organizationId = current_user.organizationId,
        event.userId = current_user.id,
        event.isClosed = form.data['isClosed'],
        event.title = form.data['title'],
        event.description = form.data['description'],
        event.date = form.data['date'],
        event.imageUrl = request.json['imageUrl']

        db.session.add(event)
        db.session.commit()
        return event.to_dict()
    return {'errors': errors_to_list(form.errors)}

@event_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_event(id):
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
    deleted_data = {}
    event = Event.query.get(id)
    deleted_data['event'] = event.deleted_info()

    db.session.delete(event)
    db.session.commit()
    return deleted_data
