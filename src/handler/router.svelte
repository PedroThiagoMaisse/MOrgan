<script>
    export let routes =  [
        {
            name: 'main',
            list: [
                {name: 'Planner'},
                {name: 'Projects'},
                {name: 'Calendar'},
                {name: 'QuickNotes'},
            ]
        },
        {
            name: 'config',
            list: [
                {name: 'Configurações', element: {}}
            ]
        }
    ]

    export let selected = [0, 0]

    export const choose = function (i, x) {
        console.log('oioio ' + i + x)
        this.routes = [i + x]
    }

const router = {
    routes:,
    selected: 
    
    choose: function (i, x) {
        console.log('oioio ' + i + x)
        this.routes = [i + x]
    }
}

export {router}
</script>

<svelte:options accessors/>