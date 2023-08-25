<script>
    export let selected, routes, changeRoute
</script>

<main>
    <h1> M_Organ </h1>

    {#each routes as element, i (element)}
        <div class="section">
            {#each element.list as option, x (option)}
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->   <!-- svelte-ignore a11y-click-events-have-key-events -->
                <p class='clickable' on:click={() => changeRoute(i, x)} bind:this={option.element}> {option.name}
                    {#if i == selected[0] && x == selected[1]} 
                        <spam class="tag"> # </spam> 
                    {/if}
                </p> 
            {/each}
        </div>
    {/each}
</main>


<style>
    .section{
        position: relative; 
        padding: 0px 0px 0px 0px; 
        margin-bottom: 16px;
        margin-top: 18px;
    }

    .tag{
        font-size: 14px; 
        color: purple;
        line-height: 100%;
        font-weight: 800;
        position: absolute;
        transform: translate(4px, 0px);
    }

    .clickable{
        line-height: 100%;
        font-size: 14px;
        margin: 0px 0px 8px 0px;
    }

    main h1{
        font-size: 22px;
        font-weight: bold;
        padding: 10px 0px 0px 0px;
        margin: 0px;
    }

    .clickable:hover{
        text-decoration: underline;
        cursor: pointer;
    }

    main{
        height: calc(100vh - 10px);
        padding-top: 10px;
        border-width: 0px 1px 0px 0px;
        border-color: #AAA;
        border-style: solid;
        width: 136px;
        display: block;
        text-align: left;
    }
</style>
  