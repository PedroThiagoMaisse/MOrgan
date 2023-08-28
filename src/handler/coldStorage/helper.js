function getHighestID(array) {
    let letter = ''
    let maxNum = '0'
    let digits = 0
    for (let index = 0; index < array.length; index++) {
        let code = ''
        let num = ''
        const element = array[index].id;
        for (let index = 0; index < element.length; index++) {
            const letter = element[index];
            if (parseInt(letter) + 1) {
                num += letter
            } else {
                code += letter
            }
        }
        if (num.length > digits) {
            digits = num.length
        }

        if (code >= letter && code != 'T' && parseInt(num) > parseInt(maxNum)) {
            maxNum = num
            letter = code
        }
    }

    return letter + maxNum
}

function generateNextId(array) {
    const code = getHighestID(array)
    let word = ''
    let num = ''
    for (let index = 0; index < code.length; index++) {
        const letter = code[index];
        if (parseInt(letter) + 1) {
            num += letter
        } else {
            word += letter
        }
    }
    let digits = num.length

    let nextNum = String(parseInt(num) + 1)

    while (nextNum.length < digits) {
        nextNum = '0' + nextNum
    }

    return word + nextNum
}


export {generateNextId}