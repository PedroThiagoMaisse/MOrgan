import { coldStorage } from "../../../Stores/coldStorage"

const Events = [ 
    {
        completedIn : [],
        firstDate : "2023-09-10",
        frequency : "D",
        frequencyDetails: {},
        id : "1", 
        name : "Exemplo" 
    }
    ]


async function clearData() {
    coldStorage.Events.put(Events )
}


const section = {   
    title: "Planner",
    array: [
        {type: 'button',     text: 'Deletar todos os dados',  details: 'NÃO HÁ VOLTA',            func: () => {clearData()}, sudo: true},
    ]
}


export default section