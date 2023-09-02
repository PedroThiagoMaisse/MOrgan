<script>
    export let data, n
    import Line from './line.svelte'
    import { selected } from '../shared';
    import Add from './addNewElement.svelte'
    let startString = ''

    let selec = ''
    
    selected.subscribe((value) => {
        selec = value
    });

    function build() {
        console.log(data)
        data.push({name: 'add', type: 'add', id: null, data: null, parent: data[0] ? data[0].id : ''})
    }

    for (let index = 1; index <= n; index++) {
        if(index === n) {
           startString += ' |----'
        } else {
        startString += ' |    '
        }
    }

    function changeStatus(id) {
        selected.set(id)
    }

    build()
</script>

<main>
    {#each data as element}
        <p>
            {startString !== '' ? ' ' + startString.replaceAll('-', ' ') + '\n' : ''}
            {startString}
            {#if element.type === 'folder'}
                <spam> {element.name} </spam> 
            {:else if element.type === 'add'}
                <Add/>
            {:else} 
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <spam class="clickable" on:click={() => changeStatus(element.id)}> {element.name} </spam>
                <spam class="tag"> {element.id === selec ? '#' : ''} </spam>
            {/if}
        </p>
        {#if element.type == 'folder'}
            <Line data="{element.data}" n={n+1}/>
        {/if}
    {/each}
</main>

<style>
    p{
        color: #AAA;
        margin: 0px;
        line-height: 100%;
        white-space: pre;
    }

    .tag{
        color: purple;
    }

    .clickable{
        color: #FFF;
        line-height: 100%;
    }

    .clickable:hover{
        text-decoration: underline;
        cursor: pointer;
    }

</style>