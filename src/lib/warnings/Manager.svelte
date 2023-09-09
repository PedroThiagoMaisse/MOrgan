<script>
    import Basic from "./Basic.svelte";
    const array = [
        {level: 'warning', text: 'Não há DB conectado!', id: '2'},
        {level: 'error', text: 'Não foi encontrando um método de Error-Handling', id: '1'}
    ]


</script>

<main> 
    {#each array as warning }
    <div>
        <Basic level="{warning.level}" text="{warning.text}" id="{warning.id}"/> 
    </div>
    {/each}
</main>

<style>
    div{
        position: relative
    }

    main{
        position: absolute;
        right: 32px;
        top: 16px;
        display: flex;
            flex-direction: column;
    }


</style>