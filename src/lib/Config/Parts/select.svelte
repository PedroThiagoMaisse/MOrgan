<script>
    export let element
    
    let value
</script>

<p class="label"> {element.text} </p>
<select bind:value={value} on:change="{() => {element.func(value)}}">
    {#each element.details as option}
        <option value="{option}">{option}</option>
    {/each}
</select>