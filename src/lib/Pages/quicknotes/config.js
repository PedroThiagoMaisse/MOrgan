import { coldStorage } from "../../../Stores/coldStorage"
import {time} from "./shared"

const notes = [
        {name: 'Tutorial', type: 'folder', id: 'B01', data: [], parent: null },
        {name: 'Headers e Cores', type: 'file', id: 'B02', data: `<div># Título Principal</div><div>## Título secundário</div><div>### Título de secção</div><div>Texto Normal</div><div>! Vermelho</div><div>!! Verde</div>`, parent: 'B01'},
        {name: 'Lista', type: 'file', id: 'B03', data: `<div> - el </div>`, parent: 'B01'},
        {name: 'Decorações', type: 'file', id: 'B04', data: `<div>~ Rasurado ~</div><div>** Negrito **</div><div>* Itálico *</div><div> > BlockQuotes</div>`, parent: 'B01'},
        {name: 'Conexões', type: 'file', id: 'B05', data: `<div>! Ainda falta definir</div>`, parent: 'B01'},
        {name: 'Play Code', type: 'file', id: 'B06', data: `<div>! Ainda falta definir</div>`, parent: 'B01'},
    ]


async function clearData() {
    coldStorage.notes.put(notes )
}

async function timer(v) {
    // @ts-ignore
    time.set(v)
}

const section = {   
    title: "Notes",
    array: [
        // @ts-ignore
        {type: 'selection',  text: 'Tempo de update',  details: [0.5,1,2.5,5,10,15], func: (value) => {timer(value)}},
        {type: 'button',     text: 'Deletar todos os dados',  details: 'NÃO HÁ VOLTA',            func: () => {clearData()}, sudo: true},
    ]
}


export default section