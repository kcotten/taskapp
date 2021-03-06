"""tasks table

Revision ID: eba150b06b71
Revises: 4cd6164fcd10
Create Date: 2019-10-07 11:33:56.645354

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eba150b06b71'
down_revision = '4cd6164fcd10'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('task',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('body', sa.String(length=140), nullable=True),
                    sa.Column('timestamp', sa.DateTime(), nullable=True),
                    sa.Column('user_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_index(op.f('ix_task_timestamp'), 'task',
                    ['timestamp'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_task_timestamp'), table_name='task')
    op.drop_table('task')
    # ### end Alembic commands ###
