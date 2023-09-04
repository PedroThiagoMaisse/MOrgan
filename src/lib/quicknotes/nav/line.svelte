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
           startString += '  '
        } else {
        startString += '  '
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
    <div class='{n ? 'line' : ''}'/>
    <div style="position: relative">
    {#each data as element}
        <div style="display: flex; position: relative">
            <div class="{element.id===selec? 'selected' : ''}" style="transform: translateX(-{n*13+16}px)"/>

            {#if element.type === 'folder'}
                <p> ˅ {element.name} </p> 
            {:else}
                <p class="clickable" on:click={() => changeStatus(element.id)}> {element.name} </p>
            {/if}

            <button class="cancel" on:click={() => dele(element.id)}> x </button>
        </div>
        {#if element.type == 'folder'}
            <Line data="{element.data}" n={n+1}/>
        {/if}
    {/each}
        <Add parent={element}/>
    </div>
</main>

<style>
    .selected{
        position: absolute;
        top: 0px;
        width: calc(180px + 32px);
        height: 24px;
        background-color: rgba(255, 255, 255, 0.1);
    }

    .clickable{
        color: #FFF;
    }

    .clickable:hover{
        text-decoration: underline;
        cursor: pointer;
    }
p{
    padding: 4px 0px 4px 0px;
    line-height: 100%;
    margin: 0px;
}

.cancel{
    padding: 0px 2px 0px 2px;
    margin-left: 6px;
    position: relative;
    bottom: 2px;
    font-size: 12px;
}

main{
    display: flex
}

.line{
    margin-left: 4px;
    width: 8px;
    border-width: 0px 0px 0px 1px;
    border-style: solid;
}

</style>