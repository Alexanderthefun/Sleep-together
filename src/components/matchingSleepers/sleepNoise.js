

export const sleepNoiseMatch = (user1, allUsers) => {
    let sleepNoiseArr = []
    for (const person of allUsers) {
        if (user1?.sleepNoiseId === person.sleepNoiseId) {
            sleepNoiseArr.push(person)
        }
    }
    return sleepNoiseArr
}