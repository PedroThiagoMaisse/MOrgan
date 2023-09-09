// @ts-nocheck
import { writable } from 'svelte/store';
import planner from '../lib/Pages/planner/Main.svelte'
import quicknotes from '../lib/Pages/quicknotes/Main.svelte'
import config from '../lib/Config/Main.svelte'
import calendarIcon from '../assets/icons/calendar.svg'
import notesIcon from '../assets/icons/notes.svg'
import settingsIcon from '../assets/icons/settings.svg'

const selected = writable([0, 0])
const routes = writable([])


routes.set( [
    {
        name: 'main',
        list: [
            {name: 'QuickNotes', component: quicknotes, icon: notesIcon},
            {name: 'Planner', component: planner, icon: calendarIcon },
        ]
    },
    {
        name: 'config',
        list: [
            {name: 'Configurações', component: config, icon: settingsIcon}
        ]
    }
])

function changeRoute(x, i) {
    selected.set([x, i])
}

export {selected, routes, changeRoute}