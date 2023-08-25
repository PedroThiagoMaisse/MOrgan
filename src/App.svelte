<script>
  import Navbar from './lib/Navbar.svelte';
  import ContentManager from './lib/ContentManager.svelte';
  import {selected, routes, changeRoute} from './handler/router'
  let select, rout
  let router = {selected, routes, changeRoute}

  router.selected.subscribe((value) => {
  select = value;
  });

  router.routes.subscribe((value) => {
    rout = value;
  });


</script>

<main>
    <Navbar selected={select} routes={rout} changeRoute={changeRoute}/>
    <ContentManager selected={select} routes={rout} changeRoute={changeRoute}/>
</main>

<style>
  main{
    display: flex;
  }
</style>
