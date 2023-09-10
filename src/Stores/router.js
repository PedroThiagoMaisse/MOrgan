// @ts-nocheck
import { writable } from 'svelte/store';

import planner from '../lib/Pages/planner/Main.svelte'
import calendarIcon from '../assets/icons/calendar.svg'

import quicknotes from '../lib/Pages/quicknotes/Main.svelte'
import notesIcon from '../assets/icons/notes.svg'

import config from '../lib/Config/Main.svelte'
import settingsIcon from '../assets/icons/settings.svg'

const selected = writable([0, 1])
const routes = writable([])


const norm =  [
    {
        name: 'main',
        list: [
            {name: 'QuickNotes', component: quicknotes, icon: notesIcon},
            {name: 'Planner', component: planner, icon: calendarIcon},
        ]
    },
    {
        name: 'config',
        list: [
            {name: 'Configurações', component: config, icon: settingsIcon}
        ]
    }
] 

routes.set(norm)


function changeRoute(x, i) {
    selected.set([x, i])
}

export {selected, routes, changeRoute, norm}