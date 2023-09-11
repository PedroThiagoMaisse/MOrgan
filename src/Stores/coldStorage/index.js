import { writable } from 'svelte/store';
import { generateNextId } from './helper';

const coldStorage = {}


async function constructBranch(key, value) {
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

    return true
}

function initiate() {
    const array = [{title: 'Events', data: [ 
        {
            completedIn : [],
            firstDate : "2023-09-10",
            frequency : "D",
            frequencyDetails: {},
            id : "1", 
            name : "Exemplo" 
        }
        ]}, {title: 'notes', data: [
            {name: 'Tutorial', type: 'folder', id: 'B01', data: [], parent: '' },
            {name: 'Headers e Cores', type: 'file', id: 'B02', data: `<div># Título Principal</div><div>## Título secundário</div><div>### Título de secção</div><div>Texto Normal</div><div>! Vermelho</div><div>!! Verde</div>`, parent: 'B01'},
            {name: 'Lista', type: 'file', id: 'B03', data: `<div> - el </div>`, parent: 'B01'},
            {name: 'Decorações', type: 'file', id: 'B04', data: `<div>~ Rasurado ~</div><div>** Negrito **</div><div>* Itálico *</div><div> > BlockQuotes</div>`, parent: 'B01'},
            {name: 'Conexões', type: 'file', id: 'B05', data: `<div>! Ainda falta definir</div>`, parent: 'B01'},
            {name: 'Play Code', type: 'file', id: 'B06', data: `<div>! Ainda falta definir</div>`, parent: 'B01'},
        ]}]

    for (let [key, value] of Object.entries(localStorage)) {
        try {
        value = JSON.parse(value)
        if (value.isCS) {
            constructBranch(key, value)
        }
        } catch (err) {}
    }

    array.forEach(element => {
        if(!coldStorage[element.title]){
            console.log(`creating ${element.title} with ${JSON.stringify(element.data)}}`)
            constructBranch(element.title, [])
            coldStorage[element.title].put(element.data)
        }
    });

}

initiate()

function setCS() {
    for (const [key, value] of Object.entries(coldStorage)) {
        const obj = { ...value, isCS: true }
        localStorage[key] = JSON.stringify(obj)
    }
}

export {coldStorage, constructBranch, setCS}