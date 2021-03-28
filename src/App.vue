<template>
    <div> 
        <NewTask 
            :focused="focused(components.NEW_TASK)"

            v-on:cancel="changeFocus(components.TODAY)"
            v-on:created="createNew($event)" />

        <div class="lists">
            <TaskList 
                class="left"

                :tasks=today
                :focused="focused(components.TODAY)"
                
                v-on:left="navigate"
                v-on:right="navigate"
                v-on:delete-completed="deleteCompleted"
                v-on:create="initCreate($event)" />

            <TaskList 
                class="right"

                :tasks=backlog
                :focused="focused(components.BACKLOG)"
                
                v-on:left="navigate"
                v-on:right="navigate"
                v-on:delete-completed="deleteCompleted"
                v-on:create="initCreate($event)" />
        </div>
    </div>
</template>

<script>
import TaskList from './components/TaskList.vue'
import NewTask from './components/NewTask.vue'

import { loadAll, Task } from './Task'


export default {
    name: 'Manager',
    components: {
        TaskList,
        NewTask
    },
    data() { 
        return {
            tasks: [],
            components: {
                NEW_TASK: 'NEW_TASK', 
                TODAY: 'TODAY',
                BACKLOG: 'BACKLOG', 
            },
            inFocus: null,
            nextTarget: null
        }
    },

    mounted() {
        this.changeFocus(this.components.TODAY)
    },


    created() {
        this.load()

        this.$watch('tasks', this.save, {
            deep: true
        })
    },

    computed: {
        today() {
            return this.flatten(
                this.sort(
                    this.tasks.filter(task => task.today() && !task.deleted())))
        },

        backlog() {
            return this.flatten(
                this.sort(
                    this.tasks.filter(task => !task.today() && !task.deleted())))
        },
    },

    methods: {
        sort(tasks) {
            return tasks.sort((task1, task2) => {
                if (task1.completed() && !task2.completed()) return 1
                else if (!task1.completed() && task2.completed) return -1
                else return 0
            })
        },

        flatten(tasks) {
            return [].concat.apply(
                [], tasks.map(task => 
                    [task].concat(this.active(task.subtasks))))
        },

        active(tasks = this.tasks) {
            return tasks.filter(task => !task.deleted())
        },

        save() {
            localStorage.setItem('tasks', JSON.stringify(this.active()))    
        },

        load() {
            this.tasks = 
                loadAll(JSON.parse(localStorage.getItem('tasks')) || [])
        },

        focused(name) {
            return this.inFocus == name
        },

        changeFocus(target) {
            this.inFocus = target
        },

        navigate() {
            if (this.focused(this.components.TODAY))
                this.changeFocus(this.components.BACKLOG)
            else
                this.changeFocus(this.components.TODAY)
        },

        initCreate(target) {
            this.changeFocus(this.components.NEW_TASK)

            this.nextTarget = target
        },

        createNew(title) {
            if (this.nextTarget instanceof Task) 
                this.nextTarget.addSubtask(new Task(title, this.nextTarget.when))
            else 
                this.tasks.push(new Task(title, this.nextTarget))

            this.changeFocus(this.components.TODAY)
        },

        deleteCompleted() {
            this.tasks.forEach(task => { 
                if(task.completed()) task.delete()
            })
        }
    }, 
}

</script>

<style>

#app {
    font-family: Helvetica Neue;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #605b5f;
    margin-top: 60px;
    line-height: 1.5;
}

.lists {
    position: relative;
}

.left {
    left: 20%;
}

.right {
    left: 55%;
}

</style>
