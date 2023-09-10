import { writable } from 'svelte/store';
import { generateNextId } from './helper';

const coldStorage = {}


function constructBranch(key, value) {
    coldStorage[key] = {
        isCS: true,
        data: value.data,
        watcher: writable(value.data),
        
        changeBranch: function (variable) {
            this.data = variable
            this.watcher.update((n) => n = variable)
            setCS()
        },

        put: function (array) {
            this.watcher.update((n) => n = array)
            this.data = array
            setCS()
        },

        post: function (Object) {
            this.watcher.update((n) => n = n.push({... Object, id: generateNextId(this.data)}))
            setCS()
        },

        delete: function (id) {
            const filteredArray = this.data.filter((value) => {return id !== value.id})
            this.watcher.update((n) => n = filteredArray)
            this.data = filteredArray
            setCS()
        },

        patch: function (value) {
            const array = JSON.parse(JSON.stringify(this.data))
            for (let index = 0; index < array.length; index++) {
                let element = array[index];
                if (value.id == element.id) {
                    array[index] = value
                }
            }
            this.watcher.update((n) => n = array)
            this.data = array
            setCS()
        }
    }

    coldStorage[key].subscribe = coldStorage[key].watcher.subscribe
    setCS()
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

export {coldStorage, constructBranch, setCS}