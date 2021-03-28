<template>
    <input 
        class="new-task"
        ref="input"

        v-model="title" 

        @keydown.esc="$emit('cancel')"
        @keydown.enter="submit">
</template>

<script>

export default {
    name: 'NewTask',

    props: {
        focused: Boolean
    },

    data() {
        return {
            title: ""
        }
    },

    watch: {
        focused(inFocus) {
            if (inFocus) this.$refs.input.focus()
        }
    },

    methods: {
        submit() {
            this.$emit('created', this.title) 
            this.title = '' 
        }
    }
}
</script>

<style scoped>

.new-task {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2em;
    color: #FFFFFF;
    background-color: #709b77;
    font-weight: 800;
}

.new-task:focus {
    outline: none;
}

</style>
