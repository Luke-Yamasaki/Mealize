from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Post
from app.forms.item_form import ItemForm
from app.forms.request_form import RequestForm
from app.utils import errors_to_list
from app.utils.s3 import accepted_file, generate_unique_file, upload_to_s3_bucket

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def posts():
    all_posts = Post.query.all()
    return {'posts': [post.to_dict() for post in all_posts]}

@post_routes.route('/<int:id>')
def post(id):
    post = Post.query.get(id)
    return post.to_dict()

@post_routes.route('/', methods=['POST'])
@login_required
def new_post():
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
    elif request.json['isItem'] == True:
        form = ItemForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if "image" not in request.files:
            return {"errors": "image required"}, 400
        image = request.files["image"]
        if not accepted_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        if form.validate_on_submit():
            image.filename = generate_unique_file(image.filename)
            upload = upload_to_s3_bucket(image)
            if "url" not in upload:
                return upload, 400
            imageUrl = upload["url"]
            post = Post(
                isItem = True,
                organizationId = current_user.organizationId,
                userId = current_user.id,
                title = form.data['title'],
                description = form.data['description'],
                quantity = form.data['quantity'],
                categoryId = form.data['categoryId'],
                imageUrl = imageUrl,
                expirationDate = form.data['expirationDate'],
                status = 0 # 0=posted, 1=reserved, 2=completed
            )
            db.session.add(post)
            db.session.commit()
            return post.to_dict()
    else:
        form = RequestForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if not form.data['imageUrl'] in ('https://mealize.s3.amazonaws.com/dairy_request.png', 'https://mealize.s3.amazonaws.com/vegetables_request.png', 'https://mealize.s3.amazonaws.com/fruits_request.png', 'https://mealize.s3.amazonaws.com/grains_request.png', 'https://mealize.s3.amazonaws.com/protein_request.png'):
            return {'error': 'Image not allowed.'}
        if form.validate_on_submit():
            post = Post(
                isItem = False,
                organizationId = current_user.organizationId,
                userId = current_user.id,
                title = form.data['title'],
                description = form.data['description'],
                quantity = form.data['quantity'],
                categoryId = form.data['categoryId'],
                imageUrl = form.data['imageUrl'],
                expirationDate = form.data['expirationDate'],
                status = 0 # 0=posted, 1=reserved, 2=completed
            )
            db.session.add(post)
            db.session.commit()
            return post.to_dict()

    return {'errors': errors_to_list(form.errors)}

@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_post(id):
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
    elif request.json['isItem'] == True:
        form = ItemForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            post = Post.query.get(id)
            post.isItem = True,
            post.organizationId = current_user.organizationId,
            post.userId = current_user.id,
            post.title = form.data['title'],
            post.description = form.data['description'],
            post.quantity = form.data['quantity'],
            post.categoryId = form.data['categoryId'],
            post.imageUrl = form.data['imageUrl'],
            post.expirationDate = form.data['expirationDate'],
            post.status = request.json['status'] # 0=posted, 1=reserved, 2=completed

            db.session.commit()
            return post.to_dict()
    else:
        form = RequestForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            post = Post.query.get(id)
            post.isItem = True,
            post.organizationId = current_user.organizationId,
            post.userId = current_user.id,
            post.title = form.data['title'],
            post.description = form.data['description'],
            post.quantity = form.data['quantity'],
            post.categoryId = form.data['categoryId'],
            post.imageUrl = form.data['imageUrl'],
            post.expirationDate = form.data['expirationDate'],
            post.status = request.json['status'] # 0=posted, 1=reserved, 2=completed

            db.session.commit()
            return post.to_dict()

    return {'errors': errors_to_list(form.errors)}

@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
    deleted_data = {}
    post = Post.query.get(id)
    deleted_data['post'] = post.deleted_info()

    db.session.delete(post)
    db.session.commit()

    return deleted_data
