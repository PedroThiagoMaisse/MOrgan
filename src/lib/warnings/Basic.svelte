<script>
    export let element
    import warning from "../../handler/warning";

    function close () {
        warning.removeWarning(element.id)
    }
</script> 

<button class="{element.level} null" on:click={close}>
    <span style="font-weight: 1000;">{element.title}</span>
    {element.text}

</button>

<style>
    button:hover{
        scale: 1.1;
        cursor: pointer;
    }

    button{
        transition: 1s;
        font-weight: 500;
        border-style: solid;
        border-width: 0px 0px 0px 6px;
        border-radius: 0px;
        margin-bottom: 12px;
        /* border-width: 1px;
        border-style: solid; */
        width: 130px;
        padding: 8px;
        font-size: 10px;
        min-height: 50px;
    }

    .warning{
        border-color: rgba(255, 200, 000, 1);
        color: rgb(163, 136, 1);
        background:   rgb(255, 241, 190);
    }

    .error{
        border-color: rgba(255, 050, 000, 1);
        color: rgba(175, 35, 0, 1);
        background:   rgb(250, 191, 177);
    }
</style>