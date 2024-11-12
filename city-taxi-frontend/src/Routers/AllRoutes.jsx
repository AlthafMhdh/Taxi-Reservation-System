import { Route, Routes } from "react-router-dom";
import Main from "./MainRoutes";
import DriverPage from "./DriverRouter";
import MyRouter from "./PassengerRouter";
import OperatorPage from "./OperatorRoute";



function AllRoutes() {
    return(
        <Routes>
            <Route path="/main" element={<Main/>}/>
            <Route path="/driver" element={<DriverPage/>}/>
            <Route path="/passenger" element={<MyRouter/>}/>
            <Route path="/operator" element={<OperatorPage/>}/>
        </Routes>        
    )
}

export default AllRoutes;