from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Message, Messageboard
from app.forms.message_form import MessageForm
from app.utils import errors_to_list
from app.utils.s3 import accepted_file, generate_unique_file, upload_to_s3_bucket
message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
@login_required
def messages():
    userId = current_user.id
    all_messages = Message.query.filter(Message.senderId == userId or Message.receiverId == userId)

    return {message.id:message.to_dict() for message in all_messages}

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
def new_conversation():
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
        board = Messageboard()
        message = Message(
            boardId = board.id,
            senderId = current_user.id,
            receiverId = request.json['receiverId'],
            content = form.data['content'],
            postId = form.data['postId'],
            imageUrl = image_url
        )
        db.session.add(board)
        db.session.add(message)
        db.session.commit()
        return {'board':board.id, 'messages':{message.id:message.to_dict() for message in board.messages}}
    elif form.validate_on_submit():
        board = Messageboard()
        message = Message(
            boardId = board.id,
            senderId = current_user.id,
            receiverId = request.json['receiverId'],
            content = form.data['content'],
            postId = form.data['postId'],
            imageUrl = ''
        )
        db.session.add(board)
        db.session.add(message)
        db.session.commit()
        return {'board':board.id, 'messages':{message.id:message.to_dict() for message in board.messages}}
    else:
        return {'errors': errors_to_list(form.errors)}

@message_routes.route('/reply', methods=['POST'])
@login_required
def reply():
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
        board = Messageboard.query.get(request.json['boardId'])
        message = Message(
            boardId = board.id,
            senderId = current_user.id,
            receiverId = request.json['receiverId'],
            content = form.data['content'],
            postId = form.data['postId'],
            imageUrl = image_url
        )

        db.session.add(message)
        db.session.commit()
        return {'board':board.id, 'messages':{message.id:message.to_dict() for message in board.messages}}
    elif form.validate_on_submit():
        board = Messageboard.query.get(request.json['boardId'])
        message = Message(
            boardId = board.id,
            senderId = current_user.id,
            receiverId = request.json['receiverId'],
            content = form.data['content'],
            postId = form.data['postId'],
            imageUrl = ''
        )

        db.session.add(message)
        db.session.commit()
        return {'board':board.id, 'messages':{message.id:message.to_dict() for message in board.messages}}
    else:
        return {'errors': errors_to_list(form.errors)}

@message_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_message(id):
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
        message = Message.query.get(id)
        board = Messageboard.query.get(message.boardId)
        if current_user.id != message.senderId:
            return {'error': "Unauthorized"}
        else:
            message.senderId = current_user.id,
            message.receiverId = request.json['receiverId'],
            message.content = form.data['content'],
            message.postId = form.data['postId'],
            message.imageUrl = image_url
        db.session.commit()
        return {'board':board.id, 'messages':{message.id:message.to_dict() for message in board.messages}}
    elif form.validate_on_submit():
        message = Message.query.get(id)
        board = Messageboard.query.get(message.boardId)
        if current_user.id != message.senderId:
            return {'error': "Unauthorized"}
        else:
            message.senderId = current_user.id,
            message.receiverId = request.json['receiverId'],
            message.content = form.data['content'],
            message.postId = form.data['postId'],
            message.imageUrl = image_url
        db.session.commit()
        return {'board':board.id, 'messages':{message.id:message.to_dict() for message in board.messages}}
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

@message_routes.route('/conversations/<int:id>', methods=['DELETE'])
@login_required
def delete_conversation(id):
    deleted_data = {}
    board = Messageboard.query.get(id)
    deleted_data['boardId'] = board.deleted_info()

    db.session.delete(board)
    db.session.commit()

    return deleted_data
