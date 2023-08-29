const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

function removeDaysFromDate(date, n) {
    const data = new Date(date)
    data.setDate(data.getDate() - n);

    return data
}

function toWeekDayName(n) {
    return days[n]
}

function toBRDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

function addDaysFromDate(date, n) {
    const data = new Date(date)
    data.setDate(data.getDate() + n)

    return data
}


function getFirstDayOffWeek(date) {
    let weekDay = date.getDay()
    const data = new Date(date)
    data.setDate(data.getDate() - weekDay)

    return data
}

function getRelativeDay(date1, date2) {
    const elapsedTime = date1.getTime() - date2.getTime()
    const elapsedDays = elapsedTime / (1000 * 60 * 60 * 24)
    
    if (elapsedDays > 0) {
        return `${elapsedDays} Dia(s) Átras`
    } else if (elapsedDays < 0) {
        return `Em ${- elapsedDays} Dia(s)`
    } else {
        return 'Hoje'
    }
}


export { removeDaysFromDate, getFirstDayOffWeek, addDaysFromDate, toBRDate, toWeekDayName, getRelativeDay }