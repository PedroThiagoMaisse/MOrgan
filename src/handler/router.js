import { writable } from 'svelte/store';
import planner from '../lib/planner/Main.svelte'
// import projects from '../lib/projects/Main.svelte'
import quicknotes from '../lib/quicknotes/Main.svelte'
import config from '../lib/config/Main.svelte'
// import tester from '../lib/tester/Main.svelte'
import calendarIcon from '../assets/icons/calendar.svg'
import notesIcon from '../assets/icons/notes.svg'
import settingsIcon from '../assets/icons/settings.svg'

console.log(notesIcon)
const selected = writable([0, 0])
const routes = writable([])


routes.set( [
    {
        name: 'main',
        list: [
            // {name: 'Tester', component: tester},
            {name: 'QuickNotes', component: quicknotes, icon: calendarIcon},
            { name: 'Planner', component: planner, icon: notesIcon },
            // { name: 'Projects', component: projects }
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