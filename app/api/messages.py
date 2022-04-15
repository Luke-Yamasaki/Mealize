from shutil import register_archive_format
from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Message
from app.forms.message_form import MessageForm
from app.utils import errors_to_list

message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
@login_required
def messages():
    userId = current_user.id
    sent_messages = Message.query.filter(Message.senderId == userId)
    received_messages = Message.query.filter(Message.receiverId == userId)
    return {'sent': {message.id:message.to_dict() for message in sent_messages}, 'received': {message.id:message.to_dict() for message in received_messages}}

@message_routes.routes('/<int:id>')
@login_required
def message(id):
    userId = current_user.id
    if Message.query.get(id).senderId == userId or Message.query.get(id).receiverId == userId:
        message = Message.query.get(id)
        return message.to_dict()
    return {'error': 'You are not authorized to view the message.'}

@message_routes.route('/', methods=['POST'])
@login_required
def new_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        message = Message(
            senderId = current_user.id,
            reveiverId = request.json['receiverId'],
            content = form.data['content'],
            imageUrl = form.data['imageUrl']
        )

        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    return {'errors': errors_to_list(form.errors)}

@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_message(id):
    deleted_data = {}
    message = Message.query.get(id)
    deleted_data['message'] = message.deleted_info()

    db.session.delete(message)
    db.session.commit()

    return deleted_data
