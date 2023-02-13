
export const snoreMatch = (user1, allUsers) => {
    let snoreMatchArr = []
    for (const person of allUsers) {
        if (user1.snoreId === person.snoreId) {
            snoreMatchArr.push(person)
        }
        else if (user1.snoreId === 1 && person.snoreId === 1) {
            snoreMatchArr.push(person)
        }
        else if (user1.snoreId === 3 && person.snoreId === 1) {
            snoreMatchArr.push(person)
        }
        else if (user1.snoreId === 2 && person.snoreId === 2) {
            snoreMatchArr.push(person)
        }
        else if (user1.snoreid === 3 && person.snoreId === 3) {
            snoreMatchArr.push(person)
        }
        else if (user1.snoreId === 2 && person.snoreId === 3) {
            snoreMatchArr.push(person)
        }
    }
    return snoreMatchArr
}

