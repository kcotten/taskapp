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
    var taskCount = 0;

    var enumerate = function(v) { track_count = 0; return v.map(function(e) {e._idx = taskCount++;});};


    self.initTasks = function() {
        self.getTasks();
    }

    self.processTasks = function() { 
        enumerate(self.vue.tasks);
        self.vue.tasks.map(function (e) {
            // map anything to the tasks
        });
    };

    self.getTasks = function() {
        var param = None;
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: getTasksUrl,
            data: JSON.stringify(param),
            success: function (response) {
                console.log(response.tasks);
                self.vue.tasks = response.tasks;
                self.processTasks();
            }
        });
    };   


    self.editTask = function(body, idx) {
        //console.log(body);
        var editId = "editButton_" + idx; 
        if ($("#" + editId).text() === "Update") {
            console.log("Updating task")
            updateTask(idx);
        } else {
            document.getElementById(editId).innerHTML = "Update";
            //var taskRow = document.getElementById(idx);
            //var cols = taskRow.children("td");
            var divId = "taskBody_" + idx;
            //console.log(divId);
            var taskBody = document.getElementById(divId);
            var newBody = document.createElement('INPUT');
            newBody.setAttribute("id", divId);
            newBody.setAttribute("type", "text");
            newBody.setAttribute("value", body);
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


    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['{{','}}'],
        data: {
            tasks: None,
        },
        mounted() {
            this.initTasks();
        },
        methods: {
            initTasks: self.initTasks,
            processTasks: self.processTasks,
            getTasks: self.getTasks,
            editTask: self.editTask,
            updateTask: self.updateTask,
            deleteTask: self.deleteTask,
            displayTasks: self.displayTasks,
            removeTaskFromDisplay: self.removeTaskFromDisplay,
        }
    });

    return self;
};

var APP = null;

jQuery(function(){APP = app();});
