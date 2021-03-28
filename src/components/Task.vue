<template>
    <li class="item" :class="{ red: selected, indent: task.isSubtask }">
        <span class="icon">{{task.icon}}</span>
        <span :class="{done: task.completed()}">
            {{task.title }}
        </span>
    </li>
</template>

<script>

export default {
    name: 'Task',
    props: {
        task: Object,
        selected: Boolean
    },
}
</script>

<style scoped>

.item {
    padding: .25em 0 .25em 0;
    border-bottom: solid;
    border-width: .1em;
    border-color: #e8e8e8;
}

.red {
    color: #b51818;
}

.done {
    text-decoration: line-through;
}

.icon {
    padding-right: .5em;
}

.indent {
    padding-left: 2em;
}

</style>
