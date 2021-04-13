export const timeLeft = (date,time) =>{

    const currentDate = new Date();

    const givenDate = new Date(date)
    console.log(givenDate.toString())
    console.log(currentDate.toString())
    givenDate.setHours(time.split(':')[0])
    givenDate.setMinutes(time.split(':')[1])

    let diffInMinutes = Math.floor(( givenDate.getTime() - currentDate.getTime()) / (1000 *60) )
    console.log(diffInMinutes)
    let minutesLeft = `${diffInMinutes % 60}m` ;
    let diffInHours = Math.floor(diffInMinutes/60)
    console.log(diffInHours)
    let hoursLeft =  `${diffInHours %24}h `
    let diffInDays = Math.floor(diffInHours/24)

    let finalStr = (diffInDays ? `${diffInDays}d `:'') + hoursLeft + minutesLeft
    return finalStr
}