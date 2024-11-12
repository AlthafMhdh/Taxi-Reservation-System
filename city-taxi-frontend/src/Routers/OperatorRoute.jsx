import { Route, Routes, Navigate } from "react-router-dom";
import SideMenu from "../Operator/SideMenu";
import Booking from "../Operator/Booking";
import BookingDetails from "../Operator/BookingDetails";
import Dashboard from "../Operator/Dashboard";
import { useAuth } from "../AuthContex";
import Profile from "../Operator/Profile";
import Book from "../Operator/Book";

function OperatorPage() {

    const { Id,authenticated } = useAuth();

    return(
        <SideMenu>
            <Routes>
            
                    {authenticated ? (
                        <Route path="/" element={<Dashboard operatorId={Id } />} />
                    ) : (
                        <Route path="/" element={<Navigate to="/operatorlogin" />} />
                    )}
                <Route path="/booking" element={<BookingDetails operatorId={Id} />}/>
                <Route path="/newbooking" element={<Booking operatorId={Id} />}/>
                <Route path="/profile" element={<Profile operatorId={Id } />} />
                <Route path="/dashboard" element={<Dashboard operatorId={Id} />}/>
                <Route path="/book" element={<Book operatorId={Id} />}/>
            </Routes>

        </SideMenu>
    )

}

export default OperatorPage;