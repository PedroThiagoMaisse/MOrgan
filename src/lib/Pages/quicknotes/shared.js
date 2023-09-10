import { writable } from 'svelte/store';
import { buildFileTree } from './helper';
import { coldStorage } from '../../../Stores/coldStorage';


const selected = writable('T00')
const time = writable(2.5)

const filesArray = coldStorage.notes.data

const filesTree = await buildFileTree(filesArray)

export {selected, filesTree, filesArray, time}