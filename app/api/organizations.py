from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Organization
from app.forms import OrganizationForm
from app.utils import errors_to_list

organization_routes = Blueprint('organizations', __name__)

@organization_routes.route('/')
def all_organizations():
    nonprofits_list = Organization.query.filter(Organization.isNonprofit == True)
    businesses_list = Organization.query.filter(Organization.isNonprofit == False)
    return {'nonprofits': {nonprofit.id:nonprofit.to_dict() for nonprofit in nonprofits_list}, 'businesses': {business.id:business.to_dict() for business in businesses_list}}

@organization_routes.route('/<int:id>')
def one_organization(id):
    organization = Organization.query.get(id)
    return organization.to_dict()

@organization_routes.route('/', methods=['POST'])
@login_required
def new_organization():
    form = OrganizationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.isManager == False:
        return {'error': 'You are not authorized for this action.'}
    if form.validate_on_submit():
        organization = Organization(
            federalId = form.data['federalId'],
            isNonprofit = request.json['isNonprofit'],
            logoUrl = form.data['logoUrl'],
            imageUrl = form.data['imageUrl'],
            open = form.data['open'],
            close = form.data['close'],
            timeslot = form.data['timeslot'],
            name = form.data['name'],
            description = form.data['description'],
            street = form.data['street'],
            zip = form.data['zip'],
            city = form.data['city'],
            state = form.data['state'],
            phone = form.data['phone'],
            email = form.data['email']
        )

        db.session.add(organization)
        db.session.commit()
        return organization.to_dict()
    return {'errors': errors_to_list(form.errors)}

@organization_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_organization(id):
    form = OrganizationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        organization = Organization.query.get(id)
        organization.federalId = form.data['federalId'],
        organization.isNonprofit = request.json['isNonprofit'],
        organization.logoUrl = form.data['logoUrl'],
        organization.imageUrl = form.data['imageUrl'],
        organization.open = form.data['open'],
        organization.close = form.data['close'],
        organization.timeslot = form.data['timeslot'],
        organization.name = form.data['name'],
        organization.description = form.data['description'],
        organization.street = form.data['street'],
        organization.zip = form.data['zip'],
        organization.city = form.data['city'],
        organization.state = form.data['state'],
        organization.phone = form.data['phone'],
        organization.email = form.data['email']

        db.session.commit()
        return organization.updated_info() # includes updatedAt
    return {'errors': errors_to_list(form.errors)}

@organization_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_organization(id):
    deleted_data ={}
    organization = Organization.query.get(id)
    deleted_data['organization'] = organization.deleted_info() # id and name

    db.session.delete(organization)
    db.session.commit()

    return deleted_data
