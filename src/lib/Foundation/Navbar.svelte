<script>
    export let selected, routes, changeRoute
</script>

<main>
    <h1> MOrgan </h1>

    <div class="option">
    {#each routes as element, i (element)}
        <div class="section">
            {#each element.list as option, x (option)}
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->   <!-- svelte-ignore a11y-click-events-have-key-events -->
                <button class="tab null {i=== selected[0] && x == selected[1] ? 'yes' : ''}" on:click={() => changeRoute(i, x)} >
                    <img alt="{option.name}" width="32px" height="32px" id="Outlined" src={option.icon}/>
                </button>
            {/each}
        </div>
    {/each}
    </div>
</main>


<style>
    .tab:hover{
        cursor: pointer;
        filter: invert(100%) sepia(0%) saturate(5700%) hue-rotate(297deg) brightness(114%) contrast(73%);
    }
    .option{
        padding: 16px 0px 0px 0px;
        height: calc(100% - 46px);
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
    .tab img{
        margin-left: 12px;
        filter: invert(24%) sepia(26%) saturate(0%) hue-rotate(262deg) brightness(93%) contrast(88%);
    }

    .yes img{
        filter: invert(100%) sepia(0%) saturate(5700%) hue-rotate(297deg) brightness(114%) contrast(73%) !important;
    }

    .tab{
        display: flex;
        margin-top: 16px;
        background-color: transparent;
        border-radius: 0px;
        border-width: 0px;
        width: calc(100% - 0px);
        height: 50px;
        padding: 8px 0px 8px 6px;
    }
    .yes{
        padding: 8px 0px 8px 4px !important;
        border-style: solid;
        border-width: 0px 0px 0px 2px !important;
        color: #DDD !important;
        border-color: #DDD !important;
    }


    main h1{
        color: #DDD;
        font-size: 12px;
        font-weight: bold;
        padding: 10px 0px 0px 12px;
        margin: 0px;
    }

    main{
        color: #999;
        background-color: #111;
        height: calc(100vh - 10px);
        padding-top: 10px;
        width: 76px;
        display: block;
        text-align: left;
    }
</style>
  