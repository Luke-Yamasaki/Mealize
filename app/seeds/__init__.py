from flask.cli import AppGroup
from .categories import seed_categories, undo_categories
from .organizations import seed_organizations, undo_organizations
from .users import seed_users, undo_users


seed_group = AppGroup('seed')

@seed_group.command('all')
def seed():
    seed_categories()
    seed_organizations()
    seed_users()


@seed_group.command('undo')
def undo():
    undo_categories()
    undo_organizations()
    undo_users()
