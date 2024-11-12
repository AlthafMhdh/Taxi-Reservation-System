import Main from './Routers/MainRoutes.jsx';
import { BrowserRouter as Router, Route,Routes, Switch, redirect } from 'react-router-dom';
import MyRouter from './Routers/PassengerRouter.jsx';
import Dashboard from "./Passenger/Dashboard";
import ReservationDetails from "./Passenger/ReservationDetails";
import Reservations from "./Passenger/Reservations";
import MyProfile from "./Passenger/Profile";
import DriverPage from './Routers/DriverRouter.jsx';
import OperatorPage from './Routers/OperatorRoute.jsx';
import NewOperator from './Operator/NewOperator.jsx';
import AdminRoutes from './Routers/AdminRoutes.jsx';
import AdminDashboard from './Admin/Admindash.jsx';
import Reserve from './Driver/Reserve.jsx';
import { AuthProvider, useAuth } from './AuthContex.jsx';
import Home from "./Home";
import DriverLogin from "./Driver/Login";
import DriverRegistration from "./Driver/Registration";
import Login from "./Passenger/Login";
import Registration from "./Passenger/Registration";
import AdLogin from "./Admin/Login";
import Mainpage from './indexdash.jsx';
import Footerpage from './FooterPage';

const Routings = () => {
    const { authenticated } = useAuth();

    return (
        <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<Main />} />
        {
          authenticated ? <>
          {/* Routes for logged-in users based on roles */}
          <Route path="/passenger/*" element={<MyRouter />} />
          <Route path="/driver/*" element={<DriverPage />} />
          <Route path="/operator/*" element={<OperatorPage />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          </> : ''
        }

          
      </Routes>
      <Footerpage />
    </Router>
    )
}

export default Routings;