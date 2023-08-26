function removeDaysFromDate(date, n) {
    let _date = date.split('/')
    _date = _date[1] + '-' + _date[0] + '-' + _date[2]
    const data = new Date(_date)
    data.setDate(data.getDate() - n);


    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
}

export {removeDaysFromDate}