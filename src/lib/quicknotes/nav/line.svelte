<script>
    export let data, n
    import Line from './line.svelte'
    import { selected } from '../shared';
    import Add from './addNewElement.svelte'
    import { coldStorage } from '../../../handler/coldStorage';
    let startString = ''

    let selec = ''
    
    coldStorage.notes.subscribe((value) =>{
        let inutil = value
    })

    selected.subscribe((value) => {
        selec = value
    });

    const element = {name: 'add', type: 'add', id: null, data: null, parent: data[0] ? data[0].parent : ''}

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

    function dele(value) {
        coldStorage.notes.delete(value)
    }
</script>

<main>
    {#each data as element}
        <p>
            {startString !== '' ? ' ' + startString.replaceAll('-', ' ') + '\n' : ''}
            {startString}
            {#if element.type === 'folder'}
                <spam> {element.name} </spam> 
            {:else if element.type === 'add'}
                <Add parent={element}/>
            {:else} 
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <spam class="clickable" on:click={() => changeStatus(element.id)}> {element.name} </spam>
                <spam class="tag"> {element.id === selec ? '#' : ''} </spam>
            {/if}
            {#if element.type !== 'add'}
                <button class="cancel" on:click={() => dele(element.id)}> x </button>
            {/if}
        </p>
        {#if element.type == 'folder'}
            <Line data="{element.data}" n={n+1}/>
        {/if}
    {/each}
        <p>
            {startString !== '' ? ' ' + startString.replaceAll('-', ' ') + '\n' : ''}
            {startString}
            <Add parent={element}/>
            {#if element.type !== 'add'}
                <button class="cancel" on:click={() => dele(element.id)}> x </button>
            {/if}
        </p>
</main>

<style>
    .cancel{
        bottom: 2px;
        scale: 0.8;
        z-index: 5;
        position: relative;
        font-size: 12px;
        line-height: 100%;
        padding: 2px 4px 2px 4px;
        background-color: transparent;
    }
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