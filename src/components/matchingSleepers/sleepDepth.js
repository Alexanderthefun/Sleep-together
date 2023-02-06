

export const sleepDepthMatch = (user1, allUsers) => {
    let sleepDepthArr = []
    for (const person of allUsers) {
        if (user1?.sleepDepthId === person.sleepDepthId) {
            sleepDepthArr.push(person)
        }
    }
    return sleepDepthArr
}