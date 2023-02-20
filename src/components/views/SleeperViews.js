import { Outlet, Route, Routes } from "react-router-dom"
import { Chat } from "../chat/Chat"
import { HomePage } from "../home/Home"
import { MatchMaker } from "../matchingSleepers/Matcher"
import { EditContainer } from "../profile/Container2"
import "./views.css"

const localSleeperUser = localStorage.getItem("sleeper_user")
    const sleeperUserObject = JSON.parse(localSleeperUser)


export const SleeperViews = () => {
    return (
        <Routes>
            
            
            <Route path="profile" element={ <EditContainer />} />
            <Route path="mymatches" element={ <MatchMaker />} />
            <Route path="mymatches/:matchId" element={ <Chat />} />
            <Route path="chat" element={ <Chat />} />
            <Route path="/" element={<HomePage />} />
            
           
                
         
        </Routes>
    )
}