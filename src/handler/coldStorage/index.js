import { writable } from 'svelte/store';

const coldStorage = {}


function constructBranch(key, value) {
    console.log(key, value)

    coldStorage[key] = {
        isCS: true,
        data: value.data,
        watcher: writable(value.data),
        
        changeBranch: function (variable) {
            this.data = variable
            this.watcher.update((n) => n = variable)
            setCS()
        },

        post: function (Object) {
            this.watcher.update((n) => n = n.push(Object))
            setCS()
        }
    }

    coldStorage[key].subscribe = coldStorage[key].watcher.subscribe
    
    console.log(coldStorage)
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
        const obj = { ...value, isCS: true }
        localStorage[key] = JSON.stringify(obj)
    }
}

export {coldStorage, constructBranch}