// check if vars are available
<<<<<<< HEAD
=======
/*
>>>>>>> abc195c5c9878c3693ef22cf9541b4bf68642abe
var user_tasks = [];
function taskCollector(tasks) {
    user_tasks = tasks;
}

console.log(user_tasks);
<<<<<<< HEAD

var app = function() {
    self.initTracks = function() {
        this.console.log(tasks);
    }

=======
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






>>>>>>> abc195c5c9878c3693ef22cf9541b4bf68642abe
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['{{','}}'],
        data: {
<<<<<<< HEAD
            tasks: user_tasks
        },
        mounted() {
            this.initTracks();
        },
        methods: {
            initTracks: self.initTracks,
=======
            tasks: None,
        },
        mounted() {
            this.initTasks();
        },
        methods: {
            initTasks: self.initTasks,
            processTasks: self.processTasks,
            getTasks: self.getTasks,
>>>>>>> abc195c5c9878c3693ef22cf9541b4bf68642abe
        }
    });

    return self;
<<<<<<< HEAD
}
=======
};

var APP = null;

jQuery(function(){APP = app();});
>>>>>>> abc195c5c9878c3693ef22cf9541b4bf68642abe
