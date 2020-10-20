var app = function () {
    const None = undefined;
    var taskCount = 0;

    var enumerate = function (v) { taskCount = 0; return v.map(function (e) { e.index = taskCount++; }); };


    self.initTasks = function () {
        self.getTasks();
    }


    self.processTasks = function () {
        enumerate(self.vue.tasks);
        self.vue.tasks.map(function (e) {
            // map anything to the tasks
            Vue.set(e, 'isEditing', false);
            //Vue.set(e, 'isDeleting', false);
            Vue.set(e, 'editIsFocus', false);
            Vue.set(e, 'deleteIsFocus', false);
        });
    };


    self.getTasks = function () {
        var param = None;
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: getTasksUrl,
            data: JSON.stringify(param),
            success: function (response) {
                var user_objects = JSON.parse(JSON.stringify(response));
                var user_tasks = Object.values(user_objects);
                for (var i = 0; i < user_tasks[0].length; i++) {
                    if (self.vue.tasks.indexOf({ id: user_tasks[0][i].id, data: user_tasks[0][i].data }) === -1) {
                        self.vue.tasks.push({ id: user_tasks[0][i].id, data: user_tasks[0][i].data });
                    }
                }
                self.processTasks();
            }
        });
    };


    getTaskById = function (id) {
        for (var i = 0; i < self.vue.tasks.length; i++) {
            if (self.vue.tasks[i].id == id) {
                return self.vue.tasks[i];
            }
        }
    }


    self.addTask = function (data) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: addTaskUrl,
            data: JSON.stringify({ body: data }),
            success: function (response) {
                self.vue.newTask = "";
                var task_object = JSON.parse(JSON.stringify(response));
                var task = Object.values(task_object);
                var mytask = { id: task[0].id, data: task[0].data };
                self.vue.tasks.unshift(mytask);
                processTasks();
            }
        });
    }


    self.editTask = function (task) {
        task.isEditing = !task.isEditing;

        if (task.isEditing) {
            task.editIsFocus = true;
            console.log("Editing...");
        } else {
            task.isEditing = false;
            //task.editIsFocus = false;
            //console.log(task.editIsFocus);
            console.log("Launching update...");
            updateTask(task);
        }
    }


    self.updateTask = function (task) {
        if (task.data == None) {
            task.data = "";
        }
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: editTasksUrl,
            data: JSON.stringify({ id: task.id, body: task.data }),
            success: function (response) {

            }
        });
    }


    self.deleteTask = function (id, index) {
        //console.log("Before splice: " + index);
        var updateTask = getTaskById(id);
        //self.vue.tasks[index].deleteIsFocus = false;
        Vue.set(self.vue.tasks[index], 'deleteIsFocus', false);
        var idx = id;
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: deleteTasksUrl,
            data: JSON.stringify({ id: idx }),
            success: function (response) {
                //self.vue.tasks.splice(index, 1);
                //console.log("After splice: " + index);
                //Vue.delete(self.vue.tasks, index)
                //console.log(self.vue.tasks[index]);

                self.vue.tasks = self.vue.tasks.filter(function (task) {
                    return task.index != index;
                });
                processTasks();
                //console.log(self.vue.tasks[index].deleteIsFocus);
                //self.vue.tasks = [];
                //getTasks();
            }
        });
        Vue.set(self.vue.tasks[index], 'deleteIsFocus', false);
    }


    self.displayTasks = function () {
        var taskTable = this.document.getElementById("taskList");
        for (task in self.vue.tasks) {

        }
    }


    self.taskEditMouseover = function (task) {
        if (task.isEditing) {
            task.editIsFocus = true;
        } else {
            if (task.editIsFocus) {
                task.editIsFocus = false;
            } else {
                task.editIsFocus = true;
            }
        }
    };


    self.taskDeleteMouseover = function (task) {
        if (task.deleteIsFocus) {
            task.deleteIsFocus = false;
        } else {
            task.deleteIsFocus = true;
        }
    };


    self.log = function (v) {
        console.log(v)
    };


    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ["<%", "%>"],
        unsafeDelimiters: ['{{', '}}'],
        data: {
            tasks: [],
            newTask: "",
        },
        created() {
            initTasks()
        },
        methods: {
            initTasks: self.initTasks,
            processTasks: self.processTasks,
            getTasks: self.getTasks,
            addTask: self.addTask,
            editTask: self.editTask,
            updateTask: self.updateTask,
            deleteTask: self.deleteTask,
            displayTasks: self.displayTasks,
            taskEditMouseover: self.taskEditMouseover,
            taskDeleteMouseover: self.taskDeleteMouseover,
            log: self.log,
        }
    });

    return self;
};

var APP = null;

jQuery(function () { APP = app(); });
