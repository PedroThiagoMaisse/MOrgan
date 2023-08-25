<script>
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

    const template = {id: 'A000',frequency: '', firstDate: null, completedIn: [], name: ''}

    const _date = new Date
    const date = `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}`

    function generateCard(date) {
        const EventsForTheDay = []
        for (let index = 0; index < events.length; index++) {
            const element = events[index];
            let flip = false
            if(element.frequency == 'D') {
                flip = true
            }

            if (flip) {
                if (element.completedIn.includes(date)) {
                    element.done = true}
                else {element.done = false}
                EventsForTheDay.push(element)
            }
        }

        return EventsForTheDay
    }

    function handleClick(value) {
        events.forEach(element => {
            if (element.id === value) {
                element.done = true
                //TODO: push
            }
        });
    
        console.log(events)
    }
</script>

<main>
    <div class="card">
        {#each generateCard(date) as element, index (index)}
            <ul> {element.name} {index} <input type="checkbox" bind:checked={element.done} on:click={() => handleClick (element.id)}/> </ul>
        {/each}
    </div>
</main>

<style> 
    .card{
        margin-left: 32px;
        width: 300px;
        height: 400px;
        border-width: 2px;
        border-color: #242424;
        border-style: solid;
    }
</style>