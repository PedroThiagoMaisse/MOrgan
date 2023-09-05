<script>
    export let selected, routes, changeRoute
</script>

<main>
    <h1> MOrgan </h1>

    {#each routes as element, i (element)}
        <div class="section">
            {#each element.list as option, x (option)}
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->   <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="tab {i=== selected[0] && x == selected[1] ? 'yes' : ''}" on:click={() => changeRoute(i, x)} >
                    <p class='clickable' bind:this={option.element}> {option.name}
                    </p> 
                </div>
            {/each}
        </div>
    {/each}
</main>


<style>
    .tab{
        height: 40px;
        padding: 20px 0px 0px 12px;
    }
    .yes{
        border-style: solid;
        border-width: 0px 0px 0px 2px;
        color: #DDD;
        border-color: #DDD;
    }
    .section{
        position: relative; 
        padding: 0px 0px 0px 0px; 
        margin-bottom: 16px;
        margin-top: 18px;
    }
    .clickable{
        line-height: 100%;
        font-size: 14px;
        margin: 0px 0px 8px 0px;
    }

    main h1{
        color: #DDD;
        font-size: 22px;
        font-weight: bold;
        padding: 10px 0px 0px 12px;
        margin: 0px;
    }

    .tab:hover{
        text-decoration: underline;
        cursor: pointer;
    }

    main{
        color: #999;
        background-color: #111;
        height: calc(100vh - 10px);
        padding-top: 10px;
        width: 136px;
        display: block;
        text-align: left;
    }
</style>
  