import { routes, norm } from "../../../Stores/router"

import settingsIcon from '../../../assets/icons/settings.svg'
import testerel from './Main.svelte'
let testerValid = false

const tester = {name: 'tester', component: testerel, icon: settingsIcon}


function flipTester() {
    if (testerValid) {
        const array = norm[0].list.filter((value) => {return value.name !== 'tester'})
        norm[0].list = array
        routes.set(norm)
    } else {
        const array = norm
        array[0].list.push(tester)
        routes.set(array)
    }

    testerValid = !testerValid
}

const section = {   
    title: "Tester",
    array: [
        // @ts-ignore
        {type: 'button',     text: 'Mostrar a Info',  details: 'Flip', func: () => {flipTester()}},
    ]
}


export default section