<script>
// @ts-nocheck

    import CreateNewTask from './createNewTask.svelte';
    import {removeDaysFromDate, getFirstDayOffWeek, addDaysFromDate, toBRDate, toWeekDayName, getRelativeDay} from './helper'
    import { coldStorage } from '../../handler/coldStorage';
    import {onMount} from 'svelte'

    let events = []
    let _date = new Date()
    const offset = _date.getTimezoneOffset()
    _date = new Date(_date.toISOString().split('T')[0])
    _date = new Date(_date.getTime() + (offset * 60 * 1000))
    const date = `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}`
    let firstDayThisWeek = getFirstDayOffWeek(_date)
    let lastDayThisWeek = addDaysFromDate(firstDayThisWeek, 6)

    let selectedWeek = 0
    let days = buildDays(date, selectedWeek)
    
    coldStorage.Events.subscribe((value) => {
        events = value
        days = buildDays(date, selectedWeek)
    })

    // Getting strings and Status (for html build)
    // change remove day to add day

    function buildDays(date, n) {
        const array = []
        const currentDay = _date.getDay()
        const firstDate = addDaysFromDate(firstDayThisWeek, n*7)
        const lastDate = addDaysFromDate(lastDayThisWeek, n*7)

        const isCurrentOrPastWeek = _date >= firstDate
        // Get first day of the week
        // If day first <= >= last
        
        // Change flip


        for (let index = 0; index <= 6; index++) {
            const data = addDaysFromDate(firstDayThisWeek, index + (n * 7))
            const weekDay = data.getDay()
            const [cardData, isCompleted] = generateCard(toBRDate(data))
            const obj ={
                array: cardData, 
                date: toBRDate(data), 
                n: currentDay - index, 
                weekDay: toWeekDayName(weekDay), 
                isCompleted, 
                relative: getRelativeDay(_date,data),
                isToday: _date.getTime() === data.getTime()
            } 

            if(isCurrentOrPastWeek && weekDay < currentDay) {
                obj.notCompleted = !isCompleted
            }

            array.push(obj)
            // Se o flip tiver ativo, colocar em verde ou vermelho a depender do caso
        }

        return array
    }

    function generateCard(dato) {
        let _dato = dato.split('/')
        _dato = new Date(_dato[1]+'/'+_dato[0]+'/'+_dato[2])
        const EventsForTheDay = []
        const weekDays = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
        const internEvents = JSON.parse(JSON.stringify(events))
        let completed = 0
        for (let index = 0; index < internEvents.length; index++) {
            const element = internEvents[index];
            let flip = false
            if(element.frequency == 'D') {
                flip = true
            }

            if(element.frequency == 'S' && element.frequencyDetails[weekDays[_dato.getDay()]] === '') {
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

    function changeWeek(n) {
        selectedWeek = n + selectedWeek
        days = buildDays(date, selectedWeek)
    }

    function dele(value) {
        coldStorage.Events.delete(value)
    }

</script>

<div class="bar">
    <!-- <div style="text-align: left; padding-left: 32px;">
        Número de dias para mostrar: <br>
        <input bind:value={backDayNumbers} name="Número de dias para mostrar" class="input"/>
    </div> -->
    <button on:click={() => {changeWeek(-1)}}> {'<'} </button>
    <CreateNewTask/>
    
    <button on:click={() => {changeWeek(1)}}> {'>'} </button>
</div>
<main>
    {#each days as card}
        <div class="card {card.isCompleted ? 'completed' : ''} 
        {card.isToday ? 'Today' : ''}
        {card.notCompleted?`delayed`  : ''}">
            <p class='detail'>{card.date},
                {card.relative}
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
    .bar{
        display: flex;
        justify-content: space-between;
        padding: 8px 0px 0px 16px;
    }

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