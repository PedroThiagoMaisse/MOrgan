<script>
    import { coldStorage } from "../../../Stores/coldStorage";
    let eventDialog
    const week = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']

    let newTask = {
        name: null,
        frequency: null,
        firstDate: null,
        completedIn: [],
        frequencyDetails: {}
    }

    function closeDialog() {
        eventDialog.close()
    }

    function newEvent() {
        eventDialog.show()
    }

    function go() {
        coldStorage.Events.post(newTask)
    }
</script>

<dialog bind:this={eventDialog} class="card">
    <p class="title"> Criar nova task </p>
    <form>

        <p class="label">Nome:</p>
        <input style="margin-bottom: 8px;" bind:value={newTask.name}/>

        <p class="label">Frequência:</p>
        <select style="margin-bottom: 8px;" bind:value={newTask.frequency}> 
            <option value="D"> Diário </option>
            <option value="S"> Semanal </option>
        </select>

        {#if newTask.frequency === 'S'}
            <p class="label"> Quais dias da semana: </p>
            <div style="display: flex;">
                {#each week as day}
                    <div class="column">
                        <p> {day} </p>
                        <input type="checkbox" bind:value={newTask.frequencyDetails[day]}>
                    </div>
                {/each}
            </div>
        {/if}
        
        <p class="label">Começa dia:</p>
        <input type="date" style="margin-bottom: 8px;" bind:value={newTask.firstDate}/>

        <div class="cardActions">
            <button class="cancel" on:click={closeDialog}> Cancelar </button>
            
            <button class="go" on:click={go}> Criar </button>
        </div>
    </form>
</dialog>

<button 
    on:click={newEvent}
    style="font-size: 14px; padding: 0px 12px 0px 12px; height: 36px; margin-top:auto; "
> + Criar nova Task </button>


<style>
    .column{
        line-height: 70%;
        text-align: center;
        display: flex;
        width: 28px;
        font-size: 12px;
        flex-direction: column;
        margin-bottom: 12px;
    }

    .column p {
        margin: 8px 0spx 8px 0px;
    }

    dialog{ 
        margin-left: auto;
        transform: translateY(40%);
        }
</style>