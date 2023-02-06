

export const mattressTypeMatch = (user1, allUsers) => {
    let mattressMatchArr = []
    for (const person of allUsers) {
        if (user1?.mattressTypeId === person.mattressTypeId) {
            mattressMatchArr.push(person)
        }
    }
    return mattressMatchArr
}