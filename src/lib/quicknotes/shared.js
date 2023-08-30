import { writable } from 'svelte/store';
import { buildFileTree } from './helper';

const selected = writable('')

const filesArray = [
    {name: 'Main', type: 'folder', id: 'B00', isOpen: false, data: [], parent: null},
    {name: 'Main', type: 'folder', id: 'B01', isOpen: false, data: [], parent: 'B00' },
    {name: 'Main', type: 'file', id: 'B02', isOpen: false, data: `<div>#&nbsp;Main</div><div>##&nbsp;Second</div><div>###&nbsp;Tirth</div><div>Normal Text</div><div>- oioi</div><div>-~ oioi</div>`, parent: 'B01'},
    {name: 'Main', type: 'file', id: 'B03', isOpen: false, data: '', parent: 'B01'},
    {name: 'Main', type: 'folder', id: 'B05', isOpen: false, data: '', parent: 'B01'},
    {name: 'Main', type: 'file', id: 'B06', isOpen: false, data: '', parent: 'B05'},
    {name: 'Main', type: 'file', id: 'B04', isOpen: false, data: '', parent: 'B01'},

]

const filesTree = await buildFileTree(filesArray)

console.log(filesTree)
export {selected, filesTree, filesArray}