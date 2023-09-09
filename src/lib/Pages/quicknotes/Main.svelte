<script> 
    import { onMount, onDestroy } from "svelte";
    import Navbar from "./nav/Main.svelte";
    import { selected } from "./shared"
    import { coldStorage, setCS } from '../../../Stores/coldStorage'
    import warning from "../../../Stores/warning";

    let filesArray = coldStorage.notes.data
    let r = {}
    let variable = ''
    let generic = null
    let started = false
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    let changesMade = false

    const subArray = [
            {tag: '#', style: {fontSize: '46px', fontWeight: '800'}},
            {tag: '##', style: {fontSize: '36px', fontWeight: '800'}},
            {tag: '###', style: {fontSize: '26px', fontWeight: '800'}},
            {tag: '!', style: {color: 'red'}},
            {tag: '!!', style: {color: 'green'}},
            {tag: '~', style: {textDecorationColor: '#FAFAFA', textDecoration: 'line-through'}},
            {tag: '**', style: {fontWeight: '1000'}},
            {tag: '* ', style: {fontStyle: 'italic'}},
            {tag: '&gt', style: {paddingLeft: '32px', backgroundColor: 'rgba(0,0,0, 0.3)'}},
            {tag: '-', style: {listStyleType: 'circle', display: 'list-item', 'listStylePosition': 'inside', marginLeft: '32px'}},
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

    function getCaretPosition(element) {
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ( (sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }

    async function getRealPosition(html, startPosition) {
        const array = html.replaceAll('<div>', '').split('</div>')
        array.pop()
        let realPosition = []

        let count = 0
        for (let index = 0; index < array.length && !realPosition.length; index++) {
            const element = array[index].trim().replaceAll('<br>', '')
            const positionsInLine = element.length + 1
            const allPassedPositions = positionsInLine + count
            if(allPassedPositions > startPosition) {
                realPosition = [index, startPosition - count] 
            }
            count += positionsInLine
        }

        return realPosition
    }

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
            if (!str.includes(att)) {
                const filtered =  subArray.filter((value) => {return att == value.tag})
                for (const [key, value] of Object.entries(filtered[0].style)) {
                    element.style[key] = null
                }
                element.setAttribute("subs", attributes.join(',').replaceAll("," + filtered[0].tag, ''))
                attributes = element.getAttribute("subs") ? element.getAttribute("subs").split(',') : []
            }
        });

        for (let i = 0; i < subArray.length; i++) {
            const sub = subArray[i];
            if (str.includes(sub.tag) && !attributes.includes(sub.tag)) {
                for (const [key, value] of Object.entries(sub.style)) {
                    element.style[key] = value
                }
                element.setAttribute("subs", attributes + "," + sub.tag)
                attributes = element.getAttribute("subs").split(',')
            }
        }
    }

    async function removeNested() {
        
    }

    async function change(value, flip) {
        try {
        const startPosition = getCaretPosition(generic)
        variable = variable.replaceAll('<br><br>', '</div><div><br>').replaceAll('<div><br></div>', '<div><br> </div>')
        const html = variable
        const realPosition = await getRealPosition(html, startPosition)
        // if (!flip) {
        //     line = realPosition[0]
        //     console.log(realPosition)
        // }

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
            await sleep(1500)
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
    <div class="textField" contenteditable="true" bind:innerHTML={variable} bind:this={generic} on:keyup={(value) => {change(value)}}>
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