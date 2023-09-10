<script>
    export let element, openWarning

</script>

<p class="label"> {element.text} </p>
<button  class={element.sudo ? 'cancel' :  ''} on:click="{ element.sudo ? ()=>{openWarning(element.func)} : element.func}">
    {element.details}
</button>