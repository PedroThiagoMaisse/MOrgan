<script>
  import Navbar from './lib/Foundation/Navbar.svelte';
  import ContentManager from './lib/Foundation/ContentManager.svelte';
  import {selected, routes, changeRoute} from './Stores/router'
  import Manager from './lib/Foundation/Warnings/Manager.svelte';
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
