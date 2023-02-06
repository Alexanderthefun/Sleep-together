

export const genderMatch = (user1, allUsers) => {
    let genderPrefMatchArray = []
  
    for (const person of allUsers) {
        if (user1?.genderMatchPreferenceId === 1 && person?.genderMatchPreferenceId === 4) {
            genderPrefMatchArray.push(person)
        }
        else if (user1?.genderMatchPreferenceId === 2 && person?.genderMatchPreferenceId === 2) {
            genderPrefMatchArray.push(person)
        }
        else if (user1?.genderMatchPreferenceId === 3 && person?.genderMatchPreferenceId === 8) {
            genderPrefMatchArray.push(person)
        }
        else if (user1?.genderMatchPreferenceId === 4 && person?.genderMatchPreferenceId === 1) {
            genderPrefMatchArray.push(person)
        }
        else if (user1?.genderMatchPreferenceId === 5 && person?.genderMatchPreferenceId === 5) {
            genderPrefMatchArray.push(person)
        }
        else if (user1?.genderMatchPreferenceId === 6 && person?.genderMatchPreferenceId === 9) {
            genderPrefMatchArray.push(person)
        }
        else if (user1?.genderMatchPreferenceId === 7 && person?.genderMatchPreferenceId === 7) {
            genderPrefMatchArray.push(person)
        }
        else if (user1?.genderMatchPreferenceId === 8 && person?.genderMatchPreferenceId === 3) {
            genderPrefMatchArray.push(person)
        }
        else if (user1?.genderMatchPreferenceId === 9 && person?.genderMatchPreferenceId === 6) {
            genderPrefMatchArray.push(person)
        }
        
    }
    return genderPrefMatchArray
    
}