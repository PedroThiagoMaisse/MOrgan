<script>
// @ts-nocheck
    import Button from "./Parts/button.svelte";
    import Dialog from "./Parts/dialog.svelte";
    import Select from "./Parts/select.svelte";

    import notes from '../Pages/quicknotes/config'
    import planner from '../Pages/planner/config'
    import tester from '../Pages/tester/config'

    let dialog = {}
    let show

    function openWarning (func) {
        dialog.func = func
        show()
    }

    const array = [
        tester,
        notes,
        planner
    ]

</script>

<main>
{#each array as section}
    <h1>{section.title}</h1>
    {#each section.array as element}
        <div style="margin-bottom: 12px;">
            {#if element.type === 'button'}
                <Button element={element} openWarning={openWarning}/>
            {:else if element.type === 'selection'}
                <Select element={element}/>
            {/if}
        </div>
    {/each}
    <div class="sep"> </div>
{/each}
<Dialog bind:obj={dialog} bind:show={show}/>

</main>
<style>
    .sep{
        margin: 12px 0px 12px 0px;
        height: 1px;
        min-width: 160px;
        width: 100%;
        border-width: 0px 0px 1px 0px;
        border-style: solid;
        border-color: rgba(255, 255, 255, 0.3);
    }
    h1{
        margin-top: 0px;
    }
    main{
        padding: 32px;
    }

</style>