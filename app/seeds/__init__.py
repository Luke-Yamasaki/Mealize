from flask.cli import AppGroup

seed_group = AppGroup('seed')

@seed_group.command('all')
def seed():
    return 'hello'

@seed_group.command('undo')
def undo():
    return 'goodbye'
