from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories

seed_group = AppGroup('seed')

@seed_group.command('all')
def seed():
    seed_categories()
    seed_users()


@seed_group.command('undo')
def undo():
    undo_categories()
    undo_users()
