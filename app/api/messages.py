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
    message_boards = Messageboard.query.filter(Messageboard.user_one == userId or Messageboard.user_two == userId)

    return {message_board.id:message_board.to_dict() for message_board in message_boards}

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

        board = Messageboard(
            user_one = current_user.id,
            user_two = request.json['receiverId']
        )
        db.session.add(board)
        db.session.commit()

        message = Message(
            boardId = board.id,
            senderId = current_user.id,
            content = form.data['content'],
            postId = form.data['postId'],
            imageUrl = image_url
        )
        db.session.add(message)
        db.session.commit()
        return board.to_dict()
    elif form.validate_on_submit():
        board = Messageboard(
            user_one = current_user.id,
            user_two = request.json['receiverId']
        )
        db.session.add(board)
        db.session.commit()

        message = Message(
            boardId = board.id,
            senderId = current_user.id,
            content = form.data['content'],
            postId = form.data['postId'],
            imageUrl = ''
        )

        db.session.add(message)
        db.session.commit()
        return board.to_dict()
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
            content = form.data['content'],
            postId = form.data['postId'],
            imageUrl = image_url
        )

        db.session.add(message)
        db.session.commit()
        return board.to_dict()
    elif form.validate_on_submit():
        board = Messageboard.query.get(request.json['boardId'])
        message = Message(
            boardId = board.id,
            senderId = current_user.id,
            content = form.data['content'],
            postId = form.data['postId'],
            imageUrl = ''
        )

        db.session.add(message)
        db.session.commit()
        return board.to_dict()
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
            message.content = form.data['content'],
            message.postId = form.data['postId'],
            message.imageUrl = image_url
        db.session.commit()
        return board.to_dict()
    elif form.validate_on_submit():
        message = Message.query.get(id)
        board = Messageboard.query.get(message.boardId)
        if current_user.id != message.senderId:
            return {'error': "Unauthorized"}
        else:
            message.senderId = current_user.id,
            message.content = form.data['content'],
            message.postId = form.data['postId'],
            message.imageUrl = image_url
        db.session.commit()
        return board.to_dict()
    else:
        return {'errors': errors_to_list(form.errors)}

@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_message(id):
    message = Message.query.get(id)
    board = Messageboard.query.get(message.boardId)

    db.session.delete(message)
    db.session.commit()

    return board.to_dict()

@message_routes.route('/conversations/<int:id>', methods=['DELETE'])
@login_required
def delete_conversation(id):
    deleted_data = {}
    board = Messageboard.query.get(id)
    deleted_data['boardId'] = board.deleted_info()

    db.session.delete(board)
    db.session.commit()

    return deleted_data
