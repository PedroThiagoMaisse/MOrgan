import { writable } from 'svelte/store';

let array = [
    {level: 'warning', text: 'Não há DB conectado!', id: '2'},
    {level: 'error', text: 'Não foi encontrando um método de Error-Handling', id: '1'}
]
const warnings = writable(array)

async function addWarning (value) {
    array.push(value)
    warnings.set(array)

}
 
async function removeWarning (id) {
    array = array.filter((value)=> {return value.id != id})

    warnings.set(array)
}

async function errorCreate (value) {
    const obj = {id: '600', text: value, level: 'error'}
    array.push(obj)
    warnings.set(array)
}

export default {warnings, addWarning, removeWarning, array, errorCreate}
