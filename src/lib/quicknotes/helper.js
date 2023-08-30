async function buildFileTree(array) {
    const parentObj = {}
    const originals = []

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.parent) {
            if (!parentObj[element.parent]) {parentObj[element.parent] = []}
            parentObj[element.parent].push(element)
        } else {
            element.data = []
            originals.push(element)
        }
    }
    
    
    buildFromParents(originals, parentObj)

    return originals
}


function buildFromParents(parents, parentObj) {
    try {
        for (let index = 0; index < parents.length; index++) {
            const element = parents[index];
            element.data = parentObj[element.id] || element.data
            buildFromParents(element.data, parentObj)
            delete parentObj[element.id]
        }
    } catch (err) {

    }
}

export {buildFileTree}