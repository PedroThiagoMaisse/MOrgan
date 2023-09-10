<script> 
    import { onMount, onDestroy } from "svelte";
    import Navbar from "./nav/Main.svelte";
    import { selected, time } from "./shared"
    import { coldStorage, setCS } from '../../../Stores/coldStorage'
    import warning from "../../../Stores/warning";

    let filesArray = coldStorage.notes.data
    let r = {}
    let variable = ''
    let generic = null
    let started = false
    let t = 20
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    let changesMade = false

    const subArray = [
            {tag: '#', style: {fontSize: '46px', fontWeight: '800'}, func: (v) => {return (v.includes('#') && !v.includes('##'))}},
            {tag: '##', style: {fontSize: '36px', fontWeight: '800'}, func: (v) => {return (v.includes('##') && !v.includes('###'))}},
            {tag: '###', style: {fontSize: '26px', fontWeight: '800'}, func: (v) => {return (v.includes('###'))}},
            {tag: '!', style: {color: 'red'}, func: (v) => {return (v.includes('!') && !v.includes('!!'))}},
            {tag: '!!', style: {color: 'green'}, func: (v) => {return (v.includes('!!'))}},
            {tag: '~', style: {textDecorationColor: '#FAFAFA', textDecoration: 'line-through'}, func: (v) => {return (v.includes('~'))}},
            {tag: '**', style: {fontWeight: '1000'},func: (v) => {return (v.includes('**'))}},
            {tag: '* ', style: {fontStyle: 'italic'}, func: (v) => {return ((v.includes('*') && !v.includes('**'))) || v.includes('***')}},
            {tag: '&gt', style: {paddingLeft: '32px', backgroundColor: 'rgba(0,0,0, 0.3)'}, func: (v) => {return (v.includes('&gt'))}},
            {tag: '-', style: {listStyleType: 'circle', display: 'list-item', 'listStylePosition': 'inside', marginLeft: '32px'}, func: (v) => {return (v.includes('-'))}},
        ]

    coldStorage.notes.subscribe(async (value) => {
        filesArray = value
    });

    selected.subscribe(async (value) => {
        for (let index = 0; index < filesArray.length; index++) {
            const element = filesArray[index];
            if(element.id === value) {
                r = element
                // @ts-ignore
                variable = element.data
                // variable = await htmlToMD(variable)
                if (started) {
                    await sleep(500)
                    change('', true)
                }
            }
        }
    });

    time.subscribe(async (value) => {
        t = value}
    )

    async function htmlToMD (html, n) {
        let newHtml = html
        let array = generic.childNodes

        for (let index = 0; index < array.length; index++) {
            const element = array[index]
            checkElement(element)
        }

        return newHtml
    }

    async function checkElement(element) {
        if (!element.getAttribute) {
            const div = document.createElement("div")
            div.innerHTML = element.textContent
            element = div
        }
        const str = element.innerHTML
        let attributes = element.getAttribute("subs") ? element.getAttribute("subs").split(',') : []

        attributes.forEach(att => {
            const f = subArray.filter((value) => {return att == value.tag})
            if (f.length) {
                if (!f[0].func(str)) {
                    for (const [key, value] of Object.entries(f[0].style)) {
                        element.style[key] = null
                    }
                    element.setAttribute("subs", attributes.join(',').replaceAll("," + f[0].tag, ''))
                    attributes = element.getAttribute("subs") ? element.getAttribute("subs").split(',') : []
                }
            } 
        })

        for (let i = 0; i < subArray.length; i++) {
            const sub = subArray[i];
            if (sub.func(str)) {
                for (const [key, value] of Object.entries(sub.style)) {
                    element.style[key] = value
                }
                element.setAttribute("subs", attributes + "," + sub.tag)
                attributes = element.getAttribute("subs").split(',')
            }
        }
    }

    async function change(value, flip) {
        try {
        variable = variable.replaceAll('<br><br>', '</div><div><br>').replaceAll('<div><br></div>', '<div><br> </div>')
        const html = variable

        variable = await htmlToMD(html)
        changesMade = true
        } catch (err) {warning.errorCreate(err)}
    }

    async function save() {
        const obj = {...r, data: variable}
        coldStorage.notes.patch(obj)
    }

    async function saveLoop() {
        while(started) {
            await sleep(t*1000)
            if (changesMade) {
                save()
                setCS()
                changesMade = false
            }
        }
    }

    onMount(async () => {
        started = true
        change('', true)
        saveLoop()
    });

    onDestroy(async () => {
        started = false
    })
</script>

<main>
    <Navbar/>
    <div role="textbox" tabindex="-1" class="textField" contenteditable="true" bind:innerHTML={variable} bind:this={generic} on:keyup={(value) => {change(value)}}>
        {r.data}
    </div>
</main>

<style>
    .textField{
        padding: 32px;
        border-radius: 0px;
        width: calc(100% + 64px);
        height: calc(100% - 64px);
        background-color: #333;
    }

    main{
        width: 100%;
        height: 100%;
        display: flex;
    }

</style>