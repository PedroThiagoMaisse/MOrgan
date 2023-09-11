import { writable } from 'svelte/store';
import { buildFileTree } from './helper';
import { coldStorage} from '../../../Stores/coldStorage';


const selected = writable('T00')
const time = writable(2.5)

let filesTree 

async function build () {
    filesTree = await buildFileTree(filesArray)
}


const filesArray = coldStorage.notes.data


build()

export {selected, filesTree, filesArray, time}