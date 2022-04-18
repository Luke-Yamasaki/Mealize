"""empty message

Revision ID: 431c531936b1
Revises: 
Create Date: 2022-04-18 13:59:03.560324

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '431c531936b1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(length=25), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('organizations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('federalId', sa.String(length=11), nullable=False),
    sa.Column('isNonprofit', sa.Boolean(), nullable=False),
    sa.Column('logoUrl', sa.String(length=2048), nullable=False),
    sa.Column('imageUrl', sa.String(length=2048), nullable=False),
    sa.Column('open', sa.Time(), nullable=False),
    sa.Column('close', sa.Time(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('street', sa.String(length=100), nullable=False),
    sa.Column('unit', sa.String(length=15), nullable=True),
    sa.Column('zip', sa.String(length=18), nullable=False),
    sa.Column('city', sa.String(length=17), nullable=False),
    sa.Column('state', sa.String(length=12), nullable=False),
    sa.Column('phone', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('phone')
    )
    op.create_table('calendars',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('organizationId', sa.Integer(), nullable=False),
    sa.Column('open', sa.DateTime(), nullable=False),
    sa.Column('close', sa.DateTime(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['organizationId'], ['organizations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('organizationId', sa.Integer(), nullable=False),
    sa.Column('isNonprofit', sa.Boolean(), nullable=False),
    sa.Column('isManager', sa.Boolean(), nullable=False),
    sa.Column('private', sa.Boolean(), nullable=False),
    sa.Column('firstName', sa.String(length=50), nullable=False),
    sa.Column('lastName', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('phone', sa.String(length=20), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('deaf', sa.Boolean(), nullable=False),
    sa.Column('autism', sa.Boolean(), nullable=False),
    sa.Column('learningDisabled', sa.Boolean(), nullable=False),
    sa.Column('lgbtq', sa.Boolean(), nullable=False),
    sa.Column('profileImageUrl', sa.String(length=2048), nullable=False),
    sa.Column('jobDescription', sa.String(length=255), nullable=False),
    sa.Column('hashedPassword', sa.String(length=255), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['organizationId'], ['organizations.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('phone')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('organizationId', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('isClosed', sa.DateTime(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('imageUrl', sa.String(length=2048), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['organizationId'], ['organizations.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('senderId', sa.Integer(), nullable=False),
    sa.Column('receiverId', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=255), nullable=False),
    sa.Column('imageUrl', sa.String(length=255), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['receiverId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['senderId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('isItem', sa.Boolean(), nullable=False),
    sa.Column('organizationId', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=35), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('quantity', sa.String(length=12), nullable=False),
    sa.Column('categoryId', sa.Integer(), nullable=False),
    sa.Column('imageUrl', sa.String(length=2048), nullable=False),
    sa.Column('expirationDate', sa.DateTime(), nullable=False),
    sa.Column('status', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['categoryId'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['organizationId'], ['organizations.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('deliveries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('isDropoff', sa.Boolean(), nullable=False),
    sa.Column('postId', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('organizationId', sa.Integer(), nullable=False),
    sa.Column('start', sa.DateTime(), nullable=False),
    sa.Column('end', sa.DateTime(), nullable=False),
    sa.Column('completed', sa.Integer(), nullable=False),
    sa.Column('cancellationReason', sa.String(length=255), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['organizationId'], ['organizations.id'], ),
    sa.ForeignKeyConstraint(['postId'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('postId', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['postId'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('message_receiver',
    sa.Column('messageId', sa.Integer(), nullable=False),
    sa.Column('receiverId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['messageId'], ['messages.id'], ),
    sa.ForeignKeyConstraint(['receiverId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('messageId', 'receiverId')
    )
    op.create_table('message_sender',
    sa.Column('messageId', sa.Integer(), nullable=False),
    sa.Column('senderId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['messageId'], ['messages.id'], ),
    sa.ForeignKeyConstraint(['senderId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('messageId', 'senderId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('message_sender')
    op.drop_table('message_receiver')
    op.drop_table('favorites')
    op.drop_table('deliveries')
    op.drop_table('posts')
    op.drop_table('messages')
    op.drop_table('events')
    op.drop_table('users')
    op.drop_table('calendars')
    op.drop_table('organizations')
    op.drop_table('categories')
    # ### end Alembic commands ###
