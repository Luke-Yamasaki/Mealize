from flask import Blueprint
from app.models import Category

category_routes = Blueprint('categories', __name__)

@category_routes.route('/')
def categories():
    all_categories = Category.query.all()
    return {'categories': {category.id:category.to_dict() for category in all_categories}}

@category_routes.route('/<int:id>')
def category(id):
    category = Category.query.get(id)
    return category.to_dict()
