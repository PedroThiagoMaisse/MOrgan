<script>
    import Line from "./line.svelte";

    import { filesTree } from "../shared";


</script>

<main>
    <Line data={filesTree} n={0} />
    <br>
      <button> + </button>
</main>

<style>
    main{
        padding: 16px;
        background-color: #202020;
        border-width: 0px 1px 0px 0px;
        border-style: solid;
        border-color: gray;
        width: 200px;
        height: 100%;
    }
</style>