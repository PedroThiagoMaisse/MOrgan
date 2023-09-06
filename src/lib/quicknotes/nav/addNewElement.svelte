<button
on:click={newNote}
class='btn'
> + </button>

<script>
    export let parent
    import { coldStorage } from "../../../handler/coldStorage";
    let eventDialog
    const week = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']

    let newTask = {
        name: null,
    }

    function closeDialog() {
        eventDialog.close()
    }

    function newNote() {
        eventDialog.show()
    }

    function go() {
        const obj = {... newTask, parent: parent.parent, data: newTask.type === 'folder' ? [] : ''}
        coldStorage.notes.post(obj)
    }
</script>

<dialog bind:this={eventDialog} class="card">
    <p class="title"> Criar novo elemento </p>
    <form>

        <p class="label">Nome:</p>
        <input style="margin-bottom: 8px;" bind:value={newTask.name}/>

        <p class="label">Tipo de elemento:</p>
        <select style="margin-bottom: 8px;" bind:value={newTask.type}> 
            <option value="file"> Anotação </option>
            <option value="folder"> Pasta </option>
        </select>

        <div class="cardActions">
            <button class="cancel" on:click={closeDialog}> Cancelar </button>
            
            <button class="go" on:click={go}> Criar </button>
        </div>
    </form>
</dialog>

<style>
    .btn{
        padding: 2px 4px 0px 4px;
        font-size: 12px;
        line-height: 90%;
    }

    dialog{ 
        margin-left: auto;
        }
</style>