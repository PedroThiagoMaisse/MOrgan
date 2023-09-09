<script>
  import Navbar from './lib/Navbar.svelte';
  import ContentManager from './lib/ContentManager.svelte';
  import {selected, routes, changeRoute} from './handler/router'
  import Manager from './lib/warnings/Manager.svelte';
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
    <Manager/>
    <ContentManager selected={select} routes={rout}/>
</main>

<style>
  main{
    display: flex;
  }
</style>
