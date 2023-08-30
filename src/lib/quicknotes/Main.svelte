<script> 
    import Navbar from "./nav/Main.svelte";
    import { selected, filesTree, filesArray } from "./shared";
    let r = {}
    let variable = ''

    selected.subscribe((value) => {
        for (let index = 0; index < filesArray.length; index++) {
            const element = filesArray[index];
            if(element.id === value) {
                r = element
                variable = element.data
                change()
            }
        }
    });

    function change(value) {
        // variable = variable.replaceAll('\n', '<div>').replaceAll('<b>', '')
        const array = variable.split('<div>')
            // console.log(variable)

        const subs = [
            {call: '#', style: 'font-size: 36px; font-weight: 600', name: 'has'},
            {call: '##', style: 'font-size: 32px; font-weight: 600', name: 'has2'},
            {call: '###', style: 'font-size: 26px; font-weight: 600', name: 'has3'},
            {call: '!', style: 'color: red', name: 'has4'},
            {call: '!!', style: 'color: green', name: 'has5'},
            {call: '~', style: 'text-decoration: solid; text-decoration-color: #FAFAFA;text-decoration-line: line-through; text-decoration-skip: spaces;', name: 'has6'},
        ]

        let str = ''
        let flip = false

        for (let index = 1; index < array.length; index++) {
            let element = array[index].trim()
            element = element.replaceAll('</div>', '')
            for (let index = 0; index < subs.length; index++) {
                const obj = subs[index];
                const span = `<span style="${obj.style}" class="${obj.name}"> ${obj.prepond || ''}`

                if(element.indexOf(obj.call + '&nbsp;') === 0 || element.indexOf(obj.call + ' ') === 0 ) {
                    flip = true
                    element = `${span} ${element} </span>`
                }
                 if(element.indexOf(`class="${obj.name}"`) !== -1 && element.indexOf(obj.call) == -1){
                    flip = true
                    element = element.slice(element.indexOf('>') + 1).replaceAll('</span>', '')
                }
            }

            str += `\n<div>${element}</div>`
        }
            
        if(flip) {
            variable = str
        }
    }
</script>

<main>
    <Navbar/>
    <div class="textField" contenteditable="true" bind:innerHTML={variable} on:input={(value) => {change(value)}}>
        {r.data}
    </div>
</main>

<style>
    .textField{
        padding: 32px;
        margin: 32px;
        border-radius: 16px;
        width: calc(100%);
        height: calc(100% - 64pxx);
        background-color: #333;
    }

    main{
        width: 100%;
        height: 100%;
        display: flex;
    }

</style>