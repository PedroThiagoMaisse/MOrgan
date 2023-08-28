<script>
    import CreateNewTask from './createNewTask.svelte';
    import {removeDaysFromDate} from './helper'
    import { coldStorage } from '../../handler/coldStorage';
    import {onMount} from 'svelte'

    let backDayNumbers = 3
    let events = []
    const _date = new Date
    const date = `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}`
    let days = buildDays(date, backDayNumbers)

    coldStorage.Events.subscribe((value) => {
        events = value
        days = buildDays(date, backDayNumbers)
    })


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
                const obj = element
                if(obj.completedIn.includes(date)) {
                   obj.completedIn = obj.completedIn.filter((value)=> {return value !== date})
                } else {
                    obj.completedIn.push(date)
                }
                coldStorage.Events.patch(obj)
            }
        });
    
    }

    function dele(value) {
        coldStorage.Events.delete(value)
        console.log(value)
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
    {#each days as card}
        <div class="card">
            <p class='detail'>{card.date}</p>
            <p class='title'>{card.n > 0 ? `${card.n} Dia(s) atrás` : 'Hoje'}</p>
            {#each card.array as element, index (index)}
                <div style="display: flex; justify-content: space-between; padding-right: 16px">
                    <p class="text"> {element.name} 
                        <input type="checkbox" bind:checked={element.done} on:click={() => handleClick (element.id, card.date)}/> 
                    </p> 
                    <button class="cancel" on:click={() => dele(element.id)}> x </button>
                </div>
            {/each}
        </div>
    {/each}
</main>

<style>
    .cancel{
        z-index: 5;
        position: relative;
        font-size: 12px;
        line-height: 100%;
        height: 20px;
        width: 20px;
        padding: 0px 0px 2px 0px;
        background-color: transparent;
    }

    .card{
        margin-left: 32px;
        margin-top: 32px;
    }

    main{
        display: flex;
        flex-wrap: wrap;
    }
</style>