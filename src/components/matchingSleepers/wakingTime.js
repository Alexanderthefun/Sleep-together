

export const wakingTimeMatch = (user1, allUsers) => {
    let wakingArr = []
    for (const person of allUsers) {
        if (user1?.wakingTimeId === person?.wakingTimeId) {
            wakingArr.push(person)
        }
    }
    return wakingArr
}