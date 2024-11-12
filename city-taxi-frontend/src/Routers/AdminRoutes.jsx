import { Route, Router, Routes, Navigate } from "react-router-dom";

import SideB from "../Admin/SideB";
import ViewOperator from "../Admin/ViewOperator";
import ViewPassengers from "../Admin/ViewPassengers";
import ViewDrivers from "../Admin/ViewDrivers";
import NewOperator from "../Operator/NewOperator";
import AdminDashboard from "../Admin/Admindash";
import ViewReservations from "../Admin/ViewReservation";
import SuspendDrivers from "../Admin/SuspendDrivers";
import { useAuth } from "../AuthContex";

function AdminRoutes() {

    const { authenticated } = useAuth();

    return(
        <><SideB>
            <Routes>
            {authenticated ? (
                    <Route path="/" element={<AdminDashboard />} />
                ) : (
                    <Route path="/" element={<Navigate to="/adminlogin" />} />
                )}
                <Route path="/operators" element={<ViewOperator />} />
                <Route path="/drivers" element={<ViewDrivers />} />
                <Route path="/passengers" element={<ViewPassengers />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/newoperator" element={<NewOperator/>}/>
                <Route path="/reservations" element={<ViewReservations/>}/>
                <Route path="/suspenddriver" element={<SuspendDrivers/>}/>
            </Routes>

        </SideB>
        <Routes>
                
        </Routes>
                
            </>
    )

}

export default AdminRoutes;