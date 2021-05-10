const dateParser = (date) => {
    const options = {
        month: 'short',
        day: 'numeric'
    }
    const partArray = new Intl.DateTimeFormat('en-US', options).formatToParts(date)
    const month = partArray.find(el => el.type === 'month').value
    const day = partArray.find(el => el.type === 'day').value

    return { month, day }
}