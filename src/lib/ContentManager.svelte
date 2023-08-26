<script>
    export let routes, selected, changeRoute
</script>

<main>
    <svelte:component this={routes[selected[0]].list[selected[1]].component}></svelte:component>
    <!-- <svelte:component this={router} bind:this={rout} /> -->
</main>