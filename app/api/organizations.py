from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Organization
from app.forms import OrganizationForm

organization_routes = Blueprint('organizations', __name__)

def errors_to_list(validation_errors):
    errors = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errors.append(f'{field} : {error}')
    return errors
