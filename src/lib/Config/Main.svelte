<script>
// @ts-nocheck
    import Button from "./Parts/button.svelte";
    import Dialog from "./Parts/dialog.svelte";
    import Select from "./Parts/select.svelte";

    let dialog = {}
    let show

    function openWarning (func) {
        dialog.func = func
        show()
    }

    const array = [
        {   title: "Opções Gerais",
            array: [
                {type: 'selection',  text: 'vamos lá',  details: [0,1,2.5,5,10,15], func: (value) => {console.log(value)}},
                {type: 'selection',  text: 'terceiro',  details: ['yes', 'no']    , func: (value) => {console.log(value)}},
                {type: 'button',     text: 'testando',  details: 'KKKK',            func: () => {console.log('oi')}},
            ]
        }
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
{/each}
<Dialog bind:obj={dialog} bind:show={show}/>

</main>
<style>
    h1{
        margin-top: 0px;
    }
    main{
        padding: 32px;
    }

</style>