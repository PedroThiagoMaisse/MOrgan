<script>
    export let obj
    export const show = () => main.show()


    function close () {
        main.close()
    }


    function go () {
        obj.func()
        main.close()
    }

    let main


</script>

<dialog bind:this={main} class="card">
        <span class="title"> Tem certeza dessa mudança? </span>
        <div class="cardActions">
            <button class="cancel" on:click={close}> Cancelar </button>
            
            <button class="go" on:click={go}> Continuar </button>
        </div>
</dialog>

<style>
    .card{
        min-height: 100px;
    }

    .card button{
        border-radius: 10px;
    }

</style>