

export const tempMatch = (user1, allUsers) => {
    let tempMatchArr = []
    for (const person of allUsers) {
        if (user1?.temperatureId === person.temperatureId) {
        tempMatchArr.push(person) 
        }
    }
    return tempMatchArr
}