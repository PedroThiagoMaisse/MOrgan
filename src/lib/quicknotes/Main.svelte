<script> 
    import { onMount } from "svelte";
    import Navbar from "./nav/Main.svelte";
    import { selected, filesTree, filesArray } from "./shared";
    let r = {}
    let variable = ''
    let generic = null

    selected.subscribe(async (value) => {
        for (let index = 0; index < filesArray.length; index++) {
            const element = filesArray[index];
            if(element.id === value) {
                r = element
                // @ts-ignore
                variable = element.data
                // variable = await htmlToMD(variable)
                change()
            }
        }
    });

    function setCaret(line, position) {
        var el = generic
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el.childNodes[line].childNodes[0], position);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

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

        let subArray = [
            {tag: '#', style: {fontSize: '46px', fontWeight: '800'}},
            {tag: '##', style: {fontSize: '36px', fontWeight: '800'}},
            {tag: '###', style: {fontSize: '26px', fontWeight: '800'}},
            {tag: '!', style: {color: 'red'}},
            {tag: '!!', style: {color: 'green'}},
        ]

        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const str = element.innerHTML
            let attributes = element.getAttribute("subs") ? element.getAttribute("subs").split(',') : []

            attributes.forEach(att => {
                console.log(str)
                if (!str.includes(att)) {
                    const filtered =  subArray.filter((value) => {return att !== value.tag})
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
            console.log(attributes)
        }

        return newHtml
    }

    async function change(value) {
        variable = variable.replaceAll('<br><br>', '<div><br> </div>').replaceAll('<div><br></div>', '<div><br> </div>')
        const startPosition = getCaretPosition(generic)
        const html = variable
        const realPosition = await getRealPosition(html, startPosition)

        variable = await htmlToMD(html)


        // setCaret(realPosition[0], realPosition[1])
    }

    onMount(async () => {
    
        variable = await htmlToMD(variable)
    });
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