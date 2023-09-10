<script>
    export let element, openWarning

</script>

<p class="label"> {element.text} </p>
<button on:click="{ element.sudo ? element.func : ()=>{openWarning(element.func)}}">
    {element.details}
</button>