from shutil import register_archive_format
from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Message
from app.forms.message_form import MessageForm
from app.utils import errors_to_list
from app.utils.s3 import accepted_file, generate_unique_file, upload_to_s3_bucket
message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
@login_required
def messages():
    userId = current_user.id
    sent_messages = Message.query.filter(Message.senderId == userId)
    received_messages = Message.query.filter(Message.receiverId == userId)
    return {'sent': {message.id:message.to_dict() for message in sent_messages}, 'received': {message.id:message.to_dict() for message in received_messages}}

@message_routes.route('/<int:id>')
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
    if "image" in request.files and not accepted_file(image.filename):
        return {"errors": "Sorry, we only accept .png, .jpg or .jpeg image files."}, 400
    elif "image" in request.files and form.validate_on_submit():
        image = request.files["image"]
        image.filename = generate_unique_file(image.filename)
        upload = upload_to_s3_bucket(image)
        if "url" not in upload:
            return upload, 400
        image_url = upload["url"]
        message = Message(
            senderId = current_user.id,
            reveiverId = request.json['receiverId'],
            content = form.data['content'],
            imageUrl = image_url
        )

        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    elif form.validate_on_submit():
        message = Message(
            senderId = current_user.id,
            reveiverId = request.json['receiverId'],
            content = form.data['content'],
            imageUrl = ''
        )

        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    else:
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
