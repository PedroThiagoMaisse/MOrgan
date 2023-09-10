<script>
    let dialog

</script>

<main>
    <div class="field card">
        <p class='title'> title </p>
        <p class='text'> text text text</p>
        <form style="display: flex; flex-direction: column">
            <p class="detail"> Input </p>
            <input/>

            <p class="detail"> Select </p>
            <select>
                <option value="A"> Teste </option>
                <option value="B"> Teste </option>
                <option value="C"> Teste </option>
            </select>

            <p class="detail"> Button </p>
            <button>
                Testing
            </button>

            <p class="detail"> Checkbox </p>
            <input type="checkbox"/>


            <p class="detail"> Date </p>
            <input type="date"/>

            <p class="detail"> Cancel </p>
            <button class="cancel"> X </button>
        </form>
    </div>

    <div class="field card" style="margin-left: 16px">
        <p class='title'> Abrir diálogo </p>
        
        <button class='go' on:click={() => {dialog.show()}}>
            Abrir
        </button>
    </div>

    <dialog class="card" bind:this={dialog} >
        <p class="title"> Exemplo de diálogo </p>

        <div class="cardActions">
            <button class="cancel" on:click={() => {dialog.close()}}> Cancelar </button>
            
            <button class="go" on:click={() => {dialog.close()}}> Okay </button>
        </div>
    </dialog>
</main>

<style>
    .detail{
        margin-bottom: 0px;
    }
    input, select, button {
        margin-bottom: 18px;
    }
    form{
        width: 200px;
    }
    .field{
        margin-left: 0px;
        width: 200px;
        padding: 32px;
    }
    main{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 32px;
    }
</style>