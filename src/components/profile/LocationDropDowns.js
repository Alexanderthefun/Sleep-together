import { useEffect, useState } from "react"
import "./profile.css"

export const Locations = ({ setterFunction }) => {
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState([])
  const [user, setUser] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    state: '',
    city: ''
  })

  const localSleeperUser = localStorage.getItem("sleeper_user")
  const sleeperUserObject = JSON.parse(localSleeperUser)

  useEffect(() => {
    fetch(`http://localhost:8088/users?id=${sleeperUserObject.id}`)
      .then(res => res.json())
      .then((res) => {
        setUser(res[0])
      })
  },[])

  useEffect(() => {
    fetch('http://localhost:8090/states')
      .then(res => res.json())
      .then((res) => {
        setStates(res)
      })
  }, [])

useEffect(() => {
  if (user)
    setFullName(user?.fullName);
    setEmail(user?.email);
    setSelectedState(user?.state);
    setSelectedCity(user?.city)
}, [user])


  useEffect(() => {
    fetch(`http://localhost:8090/cities?stateCode=${selectedState}`)
      .then(res => res.json())
      .then((res) => {
        setCities(res)
      })
  }, [selectedState])

  useEffect(() => {
    if (selectedState && selectedCity) {
      setProfile({
        fullName: fullName,
        email: email,
        state: selectedState,
        city: selectedCity
      })
    }
  }, [selectedCity, selectedState, fullName, email])


  //adjust me
  useEffect(() => {
    if (selectedCity && selectedState) {
      setterFunction(profile)
    }
  }, [profile])



  return (
    <main className="main" style={{ textAlign: "center" }}>
      <div className="locationDropdowns">
        <form className="form--login">
          <fieldset className="fieldset">
            <input 
            value={fullName}
            onChange={
              (event) => {
                setFullName(event.target.value)
              }
            }
              type="text" id="fullName" className="dropDowns"
              placeholder="Enter Full Name" required autoFocus />
          </fieldset>
          <fieldset className="fieldset">
            <input 
            value={email}
            onChange={
              (event) => {
                setEmail(event.target.value)
              }
            }
              type="email" id="email" className="dropDowns"
              placeholder="Email address" required />
          </fieldset>
          <fieldset className="fieldset">
            <select
              value={selectedState}
              className="dropDowns"
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
          <fieldset className="fieldset">
            <select
              value={selectedCity}
              className="dropDowns"
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
        </form>
      </div>
    </main>
  )
}

