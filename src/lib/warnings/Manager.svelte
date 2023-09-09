<script>
    import Basic from "./Basic.svelte";
    import warning from "../../handler/warning.js";
    let array = warning.array


    warning.warnings.subscribe((value) => {
        array = value
    })

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