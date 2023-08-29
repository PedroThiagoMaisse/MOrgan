<script>
// @ts-nocheck

    import CreateNewTask from './createNewTask.svelte';
    import {removeDaysFromDate} from './helper'
    import { coldStorage } from '../../handler/coldStorage';
    import {onMount} from 'svelte'

    let events = []
    const _date = new Date
    const date = `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}`
    let days = buildDays(date)

    coldStorage.Events.subscribe((value) => {
        events = value
        days = buildDays(date)
    })


    function buildDays(date) {
        const array = []
        const currentDay = _date.getDay()

        for (let index = 0; index <= currentDay; index++) {
            const [data, weekDay] = removeDaysFromDate(date, currentDay - index)
            const [cardData, num] = generateCard(data)
            array.push({array: cardData, isCompleted: num , date: data, n: currentDay - index, weekDay})
        }

        for (let index = (currentDay + 1); index <= 6; index++) {
            const [data, weekDay] = removeDaysFromDate(date, currentDay - index)
            const [cardData, num] = generateCard(data)
            array.push({array: cardData, isCompleted: num , date: data, n: currentDay - index, weekDay})
        }

        return array
    }

    function generateCard(dato) {
        const EventsForTheDay = []
        const internEvents = JSON.parse(JSON.stringify(events))
        let completed = 0
        for (let index = 0; index < internEvents.length; index++) {
            const element = internEvents[index];
            let flip = false
            if(element.frequency == 'D') {
                flip = true
            }

            let __date = dato.split('/')
            __date = new Date(__date[1] + '-' + __date[0] + '-' + __date[2])
            if (flip && __date >= new Date(element.firstDate)) {
                if (element.completedIn.includes(dato)) {
                    element.done = true
                    completed ++
                }
                else {element.done = false}
                EventsForTheDay.push(element)
            }
        }

        return [ EventsForTheDay, completed === EventsForTheDay.length ]
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
    }

</script>

<div style="display: flex;">
    <!-- <div style="text-align: left; padding-left: 32px;">
        Número de dias para mostrar: <br>
        <input bind:value={backDayNumbers} name="Número de dias para mostrar" class="input"/>
    </div> -->
    <CreateNewTask/>
</div>
<main>
    {#each days as card}
        <div class="card {card.isCompleted ? 'completed' : ''} 
        {card.n === 0 ? 'Today' : ''} 
        {card.n > 0 && !card.isCompleted?`delayed`  : ''}">
            <p class='detail'>{card.date},
                {card.n === 0 ? 'Hoje' : ''}
                {card.n > 0 ? `${card.n} Dia(s) atrás`  : ''}
                {card.n < 0 ? `Em ${card.n * -1} Dia(s)` : ''}
            </p>
            <p class='title'> 
                {card.weekDay}
            </p>
            {#each card.array as element, index (index)}
                <div style="display: flex; justify-content: space-between;">
                    <p class="text"> 
                        {element.name} 
                    </p>
                    <div style="display: flex; flex-direction: column; justify-content: center">
                        <div style="position: relative; bottom: 4px">
                            <input  class="checkbox" type="checkbox" bind:checked={element.done} on:click={() => handleClick (element.id, card.date)}/> 
                            <button class="cancel" on:click={() => dele(element.id)}> x </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/each}
</main>

<style>
    .delayed .title{
        color: red
    }

    .Today{
        background-color: #303030;
    }

    .checkbox{
        scale: 0.8;
    } 

    .completed .title{
        color: green
    }

    .text {
        font-size: 12px;
        max-width: 60px;
        width: 70px;
    }

    .cancel{
        bottom: 2px;
        scale: 0.8;
        z-index: 5;
        position: relative;
        font-size: 16px;
        line-height: 100%;
        height: 20px;
        width: 20px;
        padding: 0px 0px 02px 0px;
        background-color: transparent;
    }

    .card{
        padding: 16px 16px 16px 16px;
        margin-left: 16px;
        margin-top: 32px;
        min-width: 80px;
        width: 120px;
    }

    main{
        display: flex;
        flex-wrap: wrap;
    }
</style>