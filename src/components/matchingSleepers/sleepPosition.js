

export const sleepPositionMatch= (user1, allUsers) => {
    let sleepPosArr = []
    for (const person of allUsers) {
        if (user1?.sleepPositionId === person.sleepPositionId) {
            sleepPosArr.push(person)
        }
    }
    return sleepPosArr
}