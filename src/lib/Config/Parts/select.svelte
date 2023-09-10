<script>
    export let element
    
    let value

    async function go() {
        element.func(value)
    }

</script>

<p class="label"> {element.text} </p>
<select bind:value={value} on:change="{go}">
    {#each element.details as option}
        <option value="{option}">{option}</option>
    {/each}
</select>