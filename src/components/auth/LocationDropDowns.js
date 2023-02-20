import { useEffect, useState } from "react"
import "./Login.css"

//remember to serve both databases.
//make a container for EditProfile and implement the same shit. 
//alter the conditional to either state or city for the Match algorithm.
//maybe shift name, email, location to new div and place together under "basic info".
//remake all users and add photos.
//baddabing muthafucka. (now do css) 
export const Locations = ({ setterFunction }) => {
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [selectedState, setSelectedState] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [profile, setProfile] = useState({
        state: '',
        city: ''
    })
    
    useEffect(() => {
        fetch('http://localhost:8090/states')
        .then(res => res.json())
        .then((res) => {
            setStates(res)
        })
    },[])
    
    
    useEffect(() => {
        fetch(`http://localhost:8090/cities?stateCode=${selectedState}`)
        .then(res => res.json())
        .then((res) => {
            setCities(res)
        })
    },[selectedState])

    useEffect(() => {
        if (selectedState && selectedCity) {
            setProfile({
                state: selectedState,
                city: selectedCity
            })
        }
    },[selectedCity])

    useEffect(() => {
      if (selectedCity && selectedState) {
        setterFunction(profile)
      }
    }, [profile])



    return (
        <div className="locationDropdowns">
          <fieldset className="fieldset">
          <select
          className="dropDowns"
            value={selectedState}
            onChange={
                (event) => {
                    setSelectedState(event.target.value)
                }
            }
          >
            <option className="dropDowns" value="">Select State</option>
            {states.map((state) => (
              <option className="dropDowns" key={state.name} value={state.stateCode}>
                {state.name}
              </option>
            ))}
          </select>
          </fieldset>
          <fieldset className="fieldset">
          <select 
          className="dropDowns"
          value={selectedCity}
          onChange={
            (event) => {
                setSelectedCity(event.target.value)
            }
        }
          >
            <option className="dropDowns" value="">Select City</option>
            {cities.map((city) => (
              <option className="dropDowns" key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          </fieldset>
        </div>
      )
}

