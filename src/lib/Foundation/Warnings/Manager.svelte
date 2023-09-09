<script>
    import Basic from "./Basic.svelte";
    import warning from "../../../Stores/warning.js";
    let array = warning.array


    warning.warnings.subscribe((value) => {
        array = value
    })

</script>

<main> 
    {#each array as warning }
    <div>
        <Basic element="{warning}"/> 
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