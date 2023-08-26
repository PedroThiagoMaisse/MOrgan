<script>
    import CreateNewTask from './createNewTask.svelte';
    import {removeDaysFromDate} from './helper'

    let backDayNumbers = 3

    const events = [{
        id: 'A001',
        frequency: 'D',
        firstDate: '24/8/2023',
        completedIn: [],
        name: 'testing'
    }, {
        id: 'A002',
        frequency: 'D',
        firstDate: '24/8/2023',
        completedIn: ['25/8/2023'],
        name: 'testing'
    }, {
        id: 'A003',
        frequency: 'D',
        firstDate: '24/8/2023',
        completedIn: [],
        name: 'testing',
        done: true
    }]

    const _date = new Date
    const date = `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}`


    function buildDays(date, n) {
        const array = []
        for (let index = 1; index <= n; index++) {
            const data = removeDaysFromDate(date, n - index)
            array.push({array: generateCard(data), date: data, n: n-index})
            
        }

        return array
    }

    function generateCard(dato) {
        const EventsForTheDay = []
        const internEvents = JSON.parse(JSON.stringify(events))
        for (let index = 0; index < internEvents.length; index++) {
            const element = internEvents[index];
            let flip = false
            if(element.frequency == 'D') {
                flip = true
            }

            if (flip) {
                if (element.completedIn.includes(dato)) {
                    element.done = true}
                else {element.done = false}
                EventsForTheDay.push(element)
            }
        }

        return EventsForTheDay
    }

    function handleClick(value, date) {
        events.forEach(element => {
            if (element.id === value) {
                element.completedIn.push(date)
                //TODO: push
            }
        });
    
    }

</script>

<div style="display: flex;">
    <div style="text-align: left; padding-left: 32px;">
        Número de dias para mostrar: <br>
        <input bind:value={backDayNumbers} name="Número de dias para mostrar" class="input"/>
    </div>
    <CreateNewTask/>
</div>
<main>
    {#each buildDays(date, backDayNumbers) as card}
        <div class="card">
            <p class='detail'>{card.date}</p>
            <p class='title'>{card.n > 0 ? `${card.n} Dia(s) atrás` : 'Hoje'}</p>
            {#each card.array as element, index (index)}
                <p class="text"> {element.name} {index} <input type="checkbox" bind:checked={element.done} on:click={() => handleClick (element.id, card.date)}/> </p>
            {/each}
        </div>
    {/each}
</main>

<style>
    .card{
        margin-left: 32px;
        margin-top: 32px;
    }

    main{
        display: flex;
        flex-wrap: wrap;
    }
</style>