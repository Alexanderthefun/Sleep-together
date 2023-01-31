import { Outlet, Route, Routes } from "react-router-dom"



export const SleeperViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Welcome Sleeper</h1>
                    <div>If you want to know how someone is doing, ask them how they're sleeping.</div>

                    <Outlet />
                </>
            }>

                
            </Route>
        </Routes>
    )
}