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
    message_boards = Messageboard.query.filter((Messageboard.user_one == current_user.id) | (Messageboard.user_two == current_user.id))
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
    if form.validate_on_submit():
        print('////////////', request.json['receiverId'])
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
            imageUrl = request.json['imageUrl']
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
    if form.validate_on_submit():
        board = Messageboard.query.get(request.json['boardId'])
        message = Message(
            boardId = board.id,
            senderId = current_user.id,
            content = form.data['content'],
            postId = form.data['postId'],
            imageUrl = request.json['imageUrl']
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
    if form.validate_on_submit():
        message = Message.query.get(id)
        board = Messageboard.query.get(message.boardId)
        if current_user.id != message.senderId:
            return {'error': "Unauthorized"}
        else:
            message.senderId = current_user.id,
            message.content = form.data['content'],
            message.postId = form.data['postId'],
            message.imageUrl = request.json['imageUrl']
        db.session.commit()
        return board.to_dict()
    else:
        return {'errors': errors_to_list(form.errors)}

@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_message(id):
    message = Message.query.get(id)
    boardId = message.boardId
    print('//////////////////', message)
    db.session.delete(message)
    db.session.commit()

    board = Messageboard.query.get(boardId)
    print('//////////', board)
    return board.to_dict()

@message_routes.route('/conversations/<int:id>', methods=['DELETE'])
@login_required
def delete_conversation(id):
    board = Messageboard.query.get(id)
    db.session.delete(board)
    db.session.commit()

    return {'boardId': id}
