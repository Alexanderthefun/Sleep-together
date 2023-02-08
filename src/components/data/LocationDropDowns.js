import { useEffect, useState } from "react"
import { citiesApi, statesApi } from "./dataAccess"


export const Locations = () => {
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



    return (
        <div className="locationDropdowns">
          <fieldset>
            <label htmlFor="Select State">Select State  </label>
          <select
            value={selectedState}
            onChange={
                (event) => {
                    setSelectedState(event.target.value)
                }
            }
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.name} value={state.stateCode}>
                {state.name}
              </option>
            ))}
          </select>
          </fieldset>
          <fieldset>
          <label htmlFor="Select City">Select City  </label>
          <select 
          value={selectedCity}
          onChange={
            (event) => {
                setSelectedCity(event.target.value)
            }
        }
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          </fieldset>
        </div>
      )
}

