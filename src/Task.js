const status = {
    TODO: 'TODO',
    DONE: 'DONE',
    DELETED: 'DELETED'
}

const time = {
    TODAY: 'TODAY',
    BACKLOG: 'BACKLOG'
}


function randomIcon() {
    var icons = [
        '👽', '👾', '🤖', '🎃', '🧳', '🌂', '☂️', '🧵', '🧶', '🎒', '🧣', '🐶',
        '🐱', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🦁', '🐥', '🦆', '🦅', '🦉', '🐴', 
        '🦄', '🐝', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🌲', '🌳', '🌴', '⚡️',
        '💥', '🔥', '🌈', '☃️', '🌦', '🌧', '⛈', '⛰', '🏔', '⛽️', '🚧', '🚀',
        '🗽', '🗼', '🏰', '🏯', '🏟', '🎡', '🎢', '🎠', '💣', '🧨', '🪓', '🔪',
        '🗡', '⚔️', '🛡', '📦', '🛍', '🛒', '🎁', '🖍', '📝', '✏️', '💵', '💴',
        '💶', '💷', '💰', '💳']

    return icons[Math.floor(Math.random() * icons.length)]
}


function Task(title, when) {
    this.icon = randomIcon()
    this.title = title
    this.status = status.TODO
    this.when = when
    this.subtasks = []
    this.isSubtask = false

    this.completed = function() {
        return this.status == status.DONE
    }

    this.done = function() {
        this.status = status.DONE
    }

    this.redo = function() {
        this.status = status.TODO
    }

    this.delete = function() {
        this.status = status.DELETED
    }

    this.deleted = function() {
        return this.status == status.DELETED
    }

    this.today = function() {
        return this.when == time.TODAY
    }

    this.doToday = function() {
        this.when = time.TODAY
    }

    this.doLater = function() {
        this.when = time.BACKLOG
    }

    this.addSubtask = function(subtask) {
        if (this.isSubtask) return

        subtask.isSubtask = true
        this.subtasks.push(subtask)
    }

    this.addSubtasks = function (subtasks) {
        subtasks.forEach(task => this.addSubtask(task))
    }
}

function load(task) {
    var _task = Object.assign(new Task, task)
    _task.subtasks = []

    return _task
}

function loadAll(tasks) {
    return tasks.map(task => {
        var _task = load(task)

        _task.addSubtasks(task.subtasks
            .map(subtask => load(subtask)))

        return _task
    })
}

export { Task, loadAll }