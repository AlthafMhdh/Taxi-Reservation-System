import { Route, Routes, Navigate, useParams } from "react-router-dom";
import Dashboard from "../Passenger/Dashboard";
import Bar from "../Passenger/Bar";
import ReservationDetails from "../Passenger/ReservationDetails";
import Reservations from "../Passenger/Reservations";
import MyProfile from "../Passenger/Profile";
import Pay from "../Passenger/Pay";
import { useAuth } from "../AuthContex";
import NewReservations from "../Passenger/NewReservation";


function MyRouter (){

    const { Id,authenticated } = useAuth();
    

    return(

        <Bar>
            <Routes>
            {authenticated ? (
        <Route path="/" element={<Dashboard passengerId={Id} />} />
      ) : (
        <Route path="/" element={<Navigate to="/passengerlogin" />} />
      )}
                <Route path="/dashboard" element={<Dashboard passengerId={Id}/> }/>
                <Route path="/reservations" element={<ReservationDetails passengerId={Id}/>}/>
                <Route path="/newreservation" element={<Reservations passengerId={Id}/>}/>
                <Route path="/profile" element={<MyProfile passengerId={Id}/>}/>
                <Route path="/unpaid" element={<Pay passengerId={Id}/>}/>
                <Route path="/newreservations" element={<NewReservations passengerId={Id}/>}/> 
            </Routes>

        </Bar>

    );
}

export default MyRouter;