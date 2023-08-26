<script>
    let eventDialog


    function closeDialog() {
        eventDialog.close()
    }

    function newEvent() {
        eventDialog.show()
    }
</script>

<dialog bind:this={eventDialog} class="card">
    <p class="title"> Criar nova task </p>
    <form>

        <p class="label">Nome:</p>
        <input style="margin-bottom: 8px;"/>

        <p class="label">Frequência:</p>
        <select style="margin-bottom: 8px;"> 
            <option value="D"> Diário </option>
        </select>

        <p class="label">Começa dia:</p>
        <input type="date" style="margin-bottom: 8px;"/>

        <div class="cardActions">
            <button class="cancel" on:click={closeDialog}> Cancelar </button>
            
            <button class="go"> Criar </button>
        </div>
    </form>
</dialog>

<button 
    on:click={newEvent}
    style="font-size: 14px; padding: 0px 12px 0px 12px; height: 36px; margin-top:auto; margin-left: 36px"
> + Criar nova Task </button>


<style>

    dialog{ 
        margin-left: auto;
        transform: translateY(40%);
        }
</style>