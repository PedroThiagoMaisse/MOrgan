import { writable } from 'svelte/store';

const coldStorage = {}

function constructBranch(key, value) {
    coldStorage[key] = {
        isCS: true,
        data: value.data,
        watcher: writable(value.data)
    }

    coldStorage[key].subscribe =  coldStorage[key].watcher.subscribe

    coldStorage[key].changeBranch = function (variable) {
        coldStorage[key].data = variable
        coldStorage[key].watcher.update((n) => n = variable)
        setCS()
    }
}

function initiate() {
    for (let [key, value] of Object.entries(localStorage)) {
        value = JSON.parse(value)
        if (value.isCS) {
            constructBranch(key, value)
        }
    }
}

initiate()

function setCS() {
    for (const [key, value] of Object.entries(coldStorage)) {
        localStorage[key] = JSON.stringify({data: value, isCS: true})
    }
}

export {coldStorage, constructBranch}