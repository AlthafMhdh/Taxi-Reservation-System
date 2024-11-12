import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdLogin from "./Admin/Login";
import Login from "./Passenger/Login";
import DriverLogin from "./Driver/Login";
import Registration from "./Passenger/Registration";
import DriverRegistration from "./Driver/Registration";
import Home from "./Home";
import Main from "./Routers/MainRoutes";


    const Mainpage =({children}) =>{

    const [activeLink, setActiveLink] = useState("");

    const menu=[
        {
            path:"",
            name:"Home",
        },
        {
            path:"/contact",
            name:"Contact Us",
        },
        {
            path:"/about",
            name:"About Us",
        },
        {
            path:"/passengerlogin",
            name:"Passenger",
        },
        {
            path:"/driverlogin",
            name:"Driver",
        },
        {
            path:"/operatorlogin",
            name:"Operator",
        },
    ]

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

        return(
            <div>
                <div className="navbar navbar-expand-sm " style={{backgroundColor:"grey"}}>

                    <div className="dashbar" >

                    {menu.map((item) => (
                        <Link
                        key={item.path}
                        className={`dashlink ${item.path === activeLink ? "active" : ""}`}
                        to={item.path}
                        onClick={() => handleLinkClick(item.path)}
                        >
                        {item.name}
                        </Link>
                    ))}
                    
                        
                        {/* <Link className="dashlink" to="/" >Home</Link>

                        <Link className="dashlink" to="/contact" >Contact Us</Link>

                        <Link className="dashlink" to="/about" >About Us</Link>

                        <Link className="dashlink" to="/passengerlogin" >Passenger</Link>

                        <Link className="dashlink" to="/driverlogin" >Driver</Link>

                        <Link className="dashlink" to="/operatorlogin">Operator</Link> */}

       
                    </div>

                </div>

                <div className="dashbody">
                    <div>
                        <br/>
                        <h4 style={{textAlign:"center"}}>Welcome To City Taxi (Pvt) Ltd.</h4>

                            <div className="t-head">
                                <h2>Explore, Experience, and Enjoy Your ride with us.</h2>
                            </div>
                            {children}

                    </div>
                </div>
                               
            </div>
            
        )
    
}

export default Mainpage;