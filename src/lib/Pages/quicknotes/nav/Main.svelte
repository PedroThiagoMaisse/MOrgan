<script>
    import Line from "./line.svelte";
    import { buildFileTree } from "../helper";
    import { coldStorage } from "../../../../Stores/coldStorage";
    let filesTree = []

    async function initiate() {
        filesTree = await buildFileTree(coldStorage.notes.data)
    }

    initiate()

    coldStorage.notes.subscribe(async (value) => {
        filesTree = await buildFileTree(value)
    });


</script>

<main>
    <Line data={filesTree} n={0} parentId={undefined}/>
</main>

<style>
    main{
        padding: 16px;
        background-color: #202020;
        border-width: 0px 1px 0px 0px;
        border-style: solid;
        border-color: gray;
        min-width: 180px;
        height: 100%;
    }
</style>