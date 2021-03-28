<template>
    <ul tabindex="1" 
        class="task-list"
        ref="list"

        @keydown.j="down"
        @keydown.k="up" 

        @keydown.x="toggleStatus"
        @keydown.m="move"
        @keydown.d.exact="current().delete()"
        @keydown.ctrl.d="$emit('delete-completed')"

        @keydown.t.prevent="$emit('create', 'TODAY')"
        @keydown.b.prevent="$emit('create', 'BACKLOG')" 
        @keydown.s.prevent="$emit('create', current)"

        @keydown.h="$emit('left')"
        @keydown.l="$emit('right')" >


        <Task v-for="(task, index) in tasks" 
            :key="task.id" 

            :task="task"
            :selected="select(index)" />

    </ul>
</template>

<script>
import Task from './Task.vue'

export default {
    name: 'TaskList',

    components: {
        Task
    },

    props: {
        tasks: Object,
        focused: Boolean,
    },

    data() {
        return {
            pointer: 0
        }
    },

    watch: {
        focused(inFocus) {
            if (inFocus) this.$refs.list.focus()
        }
    },

    computed: {
        current() {
            return this.tasks[this.pointer]
        }
    },

    methods: {
        up() {
            if (this.pointer == 0) this.pointer = this.tasks.length - 1
            else this.pointer--
        },

        down() {
            this.pointer = (this.pointer + 1) % this.tasks.length
        },


        toggleStatus() {
            if (this.current.completed()) this.current.redo()
            else this.current.done()
        },

        select(index) {
            return this.focused && index == this.pointer
        },

        move() {
            if (this.current.today()) this.current.doLater()
            else this.current.doToday()
        },
    }
}

</script>

<style scoped>

.task-list {
    position: absolute;
    list-style-type: none;
    width: 25%;
    padding-inline-start: 0;
}

.task-list:focus {
    outline: none;
}

</style>