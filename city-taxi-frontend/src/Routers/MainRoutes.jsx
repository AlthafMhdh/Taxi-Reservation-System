import { Route, Routes } from "react-router-dom";
import Mainpage from "../indexdash";
import Home from "../Home";
import DriverLogin from "../Driver/Login";
import DriverRegistration from "../Driver/Registration";
import Login from "../Passenger/Login";
import Registration from "../Passenger/Registration";
import AdLogin from "../Admin/Login";
import OperatorLogin from "../Operator/Login";


function Main() {
    return(
        
         <Mainpage>
            <Routes>
            
                <Route index element={<Home />} />
                <Route path="/driverlogin" element={<DriverLogin/>}/>
                <Route path="/driverregister" element={<DriverRegistration/>}/>
                <Route path="/passengerlogin" element={<Login/>}/>
                <Route path="/passengerregister" element={<Registration/>}/>
                <Route path="/operatorlogin" element={<OperatorLogin/>}/>
                <Route path="/adminlogin" element={<AdLogin/>}/>
            </Routes>
          </Mainpage> 
    

    )
}

export default Main;