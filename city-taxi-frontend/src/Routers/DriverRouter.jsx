import { Route, Routes, Navigate  } from "react-router-dom";
import SideBar from "../Driver/SideBar";
import DriverDashboard from "../Driver/Dashboard";
import RideDetails from "../Driver/RideDetails";
import Ride from "../Driver/Ride";
import Profile from "../Driver/Profile";
import Reserve from "../Driver/Reserve";
import Reviews from "../Driver/Earnings";
import Earnings from "../Driver/Earnings";
import { useAuth } from "../AuthContex";
import NewBooking from "../Driver/New Booking";
import ViewReviews from "../Driver/ViewReviews";
import BookingDetails from "../Driver/BookingRideDetails";

function DriverPage() {

    const { Id,authenticated } = useAuth();

    return(
        <SideBar>
            <Routes>
                {authenticated ? (
                    <Route path="/" element={<DriverDashboard driverId={Id} />} />
                ) : (
                    <Route path="/" element={<Navigate to="/driverlogin" />} />
                )}
                <Route path="/dashboard" element={<DriverDashboard driverId={Id}/>}/>
                <Route path="/rides" element={<RideDetails driverId={Id}/>}/>
                <Route path="/newride" element={<Ride driverId={Id}/>}/>
                <Route path="/profile" element={<Profile driverId={Id}/>}/>
                <Route path="/reserve" element={<Reserve driverId={Id}/>}/>
                <Route path="/earnings" element={<Earnings driverId={Id}/>}/>
                <Route path="/newbooking" element={<NewBooking driverId={Id}/>}/>
                <Route path="/rating" element={<ViewReviews driverId={Id}/>}/>
                <Route path="/booking" element={<BookingDetails driverId={Id}/>}/>

            </Routes>

        </SideBar>
    )

}

export default DriverPage;