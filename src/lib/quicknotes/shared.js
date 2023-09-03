import { writable } from 'svelte/store';
import { buildFileTree } from './helper';
import { coldStorage } from '../../handler/coldStorage';


const selected = writable('T00')

const filesArray = coldStorage.notes.data

const filesTree = await buildFileTree(filesArray)

export {selected, filesTree, filesArray}