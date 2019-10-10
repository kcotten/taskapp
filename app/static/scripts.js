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
        }
    });

    return self;
};

var APP = null;

jQuery(function(){APP = app();});
