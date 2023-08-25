import { writable } from 'svelte/store';
import planner from '../lib/planner/Main.svelte'
import projects from '../lib/projects/Main.svelte'
// import calendar from '../lib/calendar/Main.svelte'
import quicknotes from '../lib/quicknotes/Main.svelte'
import config from '../lib/config/Main.svelte'

const selected = writable([0, 0])
const routes = writable([])


routes.set( [
    {
        name: 'main',
        list: [
            {name: 'Planner', component: planner},
            {name: 'Projects', component: projects},
            // {name: 'Calendar', component: calendar},
            {name: 'QuickNotes', component: quicknotes},
        ]
    },
    {
        name: 'config',
        list: [
            {name: 'Configurações', element: {},component: config}
        ]
    }
])

function changeRoute(x, i) {
    selected.set([x, i])
}

export {selected, routes, changeRoute}