// check if vars are available
/*
var user_tasks = [];
function taskCollector(tasks) {
    user_tasks = tasks;
}

console.log(user_tasks);
*/
var app = function() {
    const None = undefined;

    var enumerate = function(v) { self.vue.taskCount = 0; return v.map(function(e) {e._idx = self.vue.taskCount++;});};


    self.initTasks = function() {
        self.getTasks();
    }


    self.processTasks = function() { 
        enumerate(self.vue.tasks);
        self.vue.tasks.map(function (e) {
            // map anything to the tasks
            Vue.set(e, 'isEditing', e.taskBeingEdited === "no");
            Vue.set(e, 'isFocus', false);
        });
    };


    self.getTasks = function() {
        var param = None;
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: getTasksUrl,
            data: JSON.stringify(param),
            success: function (response) {
                //console.log(response.tasks);
                //self.vue.tasks = response.tasks;                
                var user_objects = JSON.parse(JSON.stringify(response));
                //console.log(user_objects);
                var user_tasks = Object.values(user_objects);
                //console.log(user_tasks);
                for(var i = 0; i < user_tasks[0].length; i++) {
                    //console.log(user_tasks[0][i]);
                    self.vue.tasks.push({ id: user_tasks[0][i].id, data: user_tasks[0][i].data});
                }
                console.log(self.vue.tasks);
                console.log(self.vue.tasks[0]);
                self.processTasks();
            }
        });
    };


    getTaskById = function(id) {
        console.log('The id is: ' + id);
        for (var i = 0; i < self.vue.tasks.length; i++) {
            if ( self.vue.tasks[i].id == id) {
                return self.vue.tasks[i];
            }
        }
    }


    self.editTask = function(idx) {
        //console.log(body);
        var editId = "editButton_" + idx; 
        var body   = getTaskById(idx);
        if ($("#" + editId).text() === "Update") {
            console.log("Updating task")
            updateTask(idx);
        } else {
            document.getElementById(editId).innerHTML = "Update";
            //var taskRow = document.getElementById(idx);
            //var cols = taskRow.children("td");
            var divId = "taskBody_" + idx;
            var taskBody = document.getElementById(divId);
            var newBody = document.createElement('INPUT');
            newBody.setAttribute("id", divId);
            newBody.setAttribute("type", "text");
            // look out here for conflict
            newBody.setAttribute("value", body.data);
            taskBody.parentNode.replaceChild(newBody, taskBody);
        }
    }


    self.updateTask = function(idx) {        
        // update table row
        var editId = "editButton_" + idx;
        var divId = "taskBody_" + idx;
        var data = document.getElementById(divId).value;
        //console.log(data);
        
        var taskBody = document.getElementById(divId);
        var newBody = document.createElement('TD');
        //newBody.setAttribute("type", "text");
        newBody.setAttribute("id", divId);
        newBody.innerHTML = "<b>" + data + "</b>";
        //newBody.setAttribute("innerHTML", data);
        taskBody.parentNode.replaceChild(newBody, taskBody);
        document.getElementById(editId).innerHTML = "Edit";
        console.log(JSON.stringify({id:idx, body:data}));
        // update db
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: editTasksUrl,
            data: JSON.stringify({id : idx, body : data}),
            success: function (response) {
                self.getTasks();
            }
        });
    }


    self.deleteTask = function(idx) {
        console.log(idx);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: deleteTasksUrl,
            data: JSON.stringify({id : idx}),
            success: function (response) {
                self.getTasks();
                self.removeTaskFromDisplay(idx);
            }
        });
    }


    self.removeTaskFromDisplay = function(idx) {
        document.getElementById(idx).remove();
    }


    self.displayTasks = function() {
        var taskTable = this.document.getElementById("taskList");
        for (task in self.vue.tasks) {

        }
    }


    self.taskMouseover = function (id) {
        var task = getElementById(id);
        if(task.isFocused) {
                track.isFocused = false;
        } else {
                track.isFocused = true;
        }
    };

    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ["<%","%>"],
        unsafeDelimiters: ['{{','}}'],
        data: {
            tasks: [],
            taskCount: 0,
        },
        created() {
            initTasks()
        },
        methods: {
            initTasks: self.initTasks,
            processTasks: self.processTasks,
            getTasks: self.getTasks,
            editTask: self.editTask,
            updateTask: self.updateTask,
            deleteTask: self.deleteTask,
            removeTaskFromDisplay: self.removeTaskFromDisplay,
            displayTasks: self.displayTasks,
            log(item) {
                console.log(item)
            },
        }
    });

    return self;
};

var APP = null;

jQuery(function(){APP = app();});
