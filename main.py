<<<<<<< HEAD
from app import app, db
from app.models import User, Task

@app.shell_context_processor
def make_shell_context():
=======
from app import app, db
from app.models import User, Task

@app.shell_context_processor
def make_shell_context():
>>>>>>> abc195c5c9878c3693ef22cf9541b4bf68642abe
    return {'db': db, 'User': User, 'Task': Task}