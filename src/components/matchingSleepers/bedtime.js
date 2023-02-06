

export const bedtimeMatch = (user1, allUsers) => {
    let bedtimeArr = []
    for (const person of allUsers) {
        if (user1?.bedTimeId === person.bedTimeId) {
            bedtimeArr.push(person)
        }
    }
    return bedtimeArr
}