import { writable } from 'svelte/store';
import { buildFileTree } from './helper';

const selected = writable('T00')

const filesArray = [
    { name: 'Main', type: 'folder', id: 'B00', data: [], parent: null },
    { name: 'Teste', type: 'file', id: 'T00', data: `<div> KKK </div><div>## Título secundário</div>`, parent: 'B00' },
    {name: 'Tutorial', type: 'folder', id: 'B01', data: [], parent: 'B00' },
    {name: 'Headers e Cores', type: 'file', id: 'B02', data: `<div># Título Principal</div><div>## Título secundário</div><div>### Título de secção</div><div>Texto Normal</div><div>! Vermelho</div><div>!! Verde</div>`, parent: 'B01'},
    {name: 'Lista', type: 'file', id: 'B03', data: `<div> - el </div>`, parent: 'B01'},
    {name: 'Decorações', type: 'file', id: 'B04', data: `<div>~ Rasurado ~</div><div>** Negrito **</div><div>* Itálico *</div><div> > BlockQuotes</div>`, parent: 'B01'},
    {name: 'Conexões', type: 'file', id: 'B05', data: `<div>! Ainda falta definir</div>`, parent: 'B01'},
    {name: 'Play Code', type: 'file', id: 'B06', data: `<div>! Ainda falta definir</div>`, parent: 'B01'},
    { name: 'Main', type: 'file', id: 'B07', data: '', parent: 'B00' },

]

const filesTree = await buildFileTree(filesArray)

console.log(filesTree)
export {selected, filesTree, filesArray}