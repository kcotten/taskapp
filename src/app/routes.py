from flask import render_template, flash, redirect, url_for, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse
from app.models import User, Task
from app import app, db
from app.forms import LoginForm, RegistrationForm, TaskForm


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
@login_required
def index():
    form = TaskForm()
    tasks = current_user.user_tasks().all()
    return render_template("index.html", title='Home Page', form=form,
                           tasks=tasks)


@app.route('/add', methods=['GET', 'POST'])
def add():
    body = request.json['body']
    print(body)
    task = Task(body=body, user_id=current_user.id)
    db.session.add(task)
    db.session.commit()
    ret = Task.query.filter_by(body=body).first()
    taskToAdd = dict(
        id=int(ret.id),
        data=ret.body
    )
    print('Task added')
    return jsonify(task=taskToAdd)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)


@app.route('/delete', methods=['GET', 'POST'])
def delete():
    print('Delete has been called')
    id = request.json['id']
    taskToDelete = Task.query.filter_by(id=id).first()
    db.session.delete(taskToDelete)
    db.session.commit()
    print('Task deleted')
    return ""


@app.route('/edit', methods=['GET', 'POST'])
def edit():
    print('Edit has been called')
    id = request.json['id']
    print(id)
    body = request.json['body']
    print(body)
    taskToUpdate = Task.query.filter_by(id=id).first()
    taskToUpdate.body = body
    db.session.commit()
    print('Edit successful')
    return ""


@app.route('/getTasks', methods=['GET', 'POST'])
def getTasks():
    print('Getting tasks')
    tasks = current_user.user_tasks().all()
    userTasks = []
    for task in tasks:
        taskToAdd = dict(
            id=int(task.id),
            data=task.body
        )
        userTasks.append(taskToAdd)
    return jsonify(dict(tasks=userTasks))
