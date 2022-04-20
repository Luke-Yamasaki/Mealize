from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Post
from app.forms.post_form import PostForm
from app.utils import errors_to_list
from app.utils.s3 import accepted_file, generate_unique_file, upload_to_s3_bucket

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def posts():
    all_posts = Post.query.all()
    return {post.id:post.to_dict() for post in all_posts}

@post_routes.route('/<int:id>')
def post(id):
    post = Post.query.get(id)
    return post.to_dict()

@post_routes.route('/images', methods=['POST'])
@login_required
def image_validation():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not accepted_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = generate_unique_file(image.filename)

    upload = upload_to_s3_bucket(image)
    print('testing upload', upload)
    if "url" not in upload:
        print('testing upload', upload)
        return upload, 400

    imageUrl = upload["url"]

    return {"imageUrl": imageUrl}



@post_routes.route('/validate', methods=['POST'])
@login_required
def form_validation():
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        return {'message': 'success'}
    return {'errors': errors_to_list(form.errors)}



@post_routes.route('/items', methods=['POST'])
@login_required
def new_item():
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            isItem = True,
            organizationId = current_user.organizationId,
            userId = current_user.id,
            title = form.data['title'],
            description = form.data['description'],
            quantity = form.data['quantity'],
            categoryId = form.data['categoryId'],
            imageUrl = request.json['imageUrl'],
            expDate = form.data['expDate'],
            status = 0 # 0=posted, 1=reserved, 2=completed
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': errors_to_list(form.errors)}

@post_routes.route('/items/<int:id>', methods=['PUT'])
@login_required
def update_item(id):
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
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
    return {'errors': errors_to_list(form.errors)}

@post_routes.route('/', methods=['POST'])
@login_required
def new_request():
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    isItem = request.json['isItem']
    if form.validate_on_submit():
        post = Post(
            isItem = isItem,
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

@post_routes.route('/requests/<int:id>', methods=['PUT'])
@login_required
def update_request(id):
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
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
