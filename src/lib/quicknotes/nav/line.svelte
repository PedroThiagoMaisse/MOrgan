<script>
    export let data, n, parentId
    import Line from './line.svelte'
    import { selected } from '../shared';
    import Add from './addNewElement.svelte'
    import { coldStorage } from '../../../handler/coldStorage';
    let startString = ''
    let isOpen = true
    let selec = ''
    let unique = {}

    coldStorage.notes.subscribe((value) =>{
        let inutil = value
    })

    selected.subscribe((value) => {
        selec = value
    });

    const element = {name: 'add', type: 'add', id: null, data: null, parent: parentId}

    function changeStatus(id) {
        selected.set(id)
    }

    function dele(value) {
        coldStorage.notes.delete(value)
    }

    function changeOpenStatus(element) {
        element.isOpen = element.isOpen? false : true
        unique = {}
    }
</script>

<main>
    <div class='{n ? 'line' : ''}'/>
    <div style="position: relative">
    {#each data as element}
        <div style="display: flex; position: relative">
            <div class="{element.id===selec? 'selected' : ''}" style="transform: translateX(-{n*13+16}px)"/>
            {#if element.type === 'folder'}
                <button class="hover null" on:click={() => changeOpenStatus(element)} > 
                    {element.isOpen && unique ? '˅' : '>'} 
                    {element.name}
                </button> 
            {:else}
                <button class="clickable" on:click={() => changeStatus(element.id)}> {element.name} </button>
            {/if}

            <button class="cancel" on:click={() => dele(element.id)}> x </button>
        </div>
        {#if element.type == 'folder' && element.isOpen}
            <Line data="{element.data}" n={n+1} parentId={element.id}/>
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
        height: 28px;
        background-color: rgba(255, 255, 255, 0.1);
    }

    .clickable{
        color: #FFF;
        font-size: 14px;
    }


    .hover{
        color: #CCC;
    }

    .hover:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .clickable:hover{
        text-decoration: underline;
        cursor: pointer;
    }

button{
    padding: 6px 0px 8px 0px;
    line-height: 100%;
    margin: 0px;
    background-color: transparent;
    border-width: 0px;
}

.cancel{
    height: 16px;
    padding: 0px 4px 0px 4px;
    margin-left: 6px;
    position: relative;
    bottom: -6px;
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
    border-color: rgba(140, 140, 140, 0.5);
}

</style>