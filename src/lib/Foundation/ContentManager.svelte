<script>
    export let routes, selected
</script>

<main style="width: 100%;">
    <svelte:component this={routes[selected[0]].list[selected[1]].component}></svelte:component>
    <!-- <svelte:component this={router} bind:this={rout} /> -->
</main>

