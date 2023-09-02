<script> 
    import { onMount } from "svelte";
    import Navbar from "./nav/Main.svelte";
    import { selected, filesTree, filesArray } from "./shared";
    let r = {}
    let variable = ''
    let generic = null

    selected.subscribe((value) => {
        for (let index = 0; index < filesArray.length; index++) {
            const element = filesArray[index];
            if(element.id === value) {
                r = element
                // @ts-ignore
                variable = element.data
                // change()
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
            console.log('aq')
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

    async function change(value) {
        variable = variable.replaceAll('<br><br>', '<div><br> </div>').replaceAll('<div><br></div>', '<div><br> </div>')
        const startPosition = getCaretPosition(generic)
        const html = variable
        const realPosition = await getRealPosition(html, startPosition)

        setCaret(realPosition[0], realPosition[1])
    }
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