from flask.cli import AppGroup
from .users import seed_users, undo_users

seed_group = AppGroup('seed')

@seed_group.command('all')
def seed():
    seed_users()

@seed_group.command('undo')
def undo():
    undo_users()
