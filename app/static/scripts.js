// check if vars are available
var user_tasks = [];
function taskCollector(tasks) {
    user_tasks = tasks;
}

console.log(user_tasks);

var app = function() {
    self.initTracks = function() {
        this.console.log(tasks);
    }

    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['{{','}}'],
        data: {
            tasks: user_tasks
        },
        mounted() {
            this.initTracks();
        },
        methods: {
            initTracks: self.initTracks,
        }
    });

    return self;
}
