import React, { useState, useEffect } from "react";
import '../App.css';

import {} from 'react-icons';
import { IoMdSettings } from "react-icons/io";
import { FaUser,FaBars,FaTh } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../AuthContex";
import { IoMdAdd } from "react-icons/io";
import { FaCar,FaPlus } from "react-icons/fa";


const Bar =({children}) =>{



    const [isOpen, setIsOpen] =useState(true);
    const toggle =()=>setIsOpen(!isOpen);

    const [activeLink, setActiveLink] = useState(); // Default active link

    const navigate = useNavigate();
    const { logout } = useAuth();
    const { isAuthenticated } = useAuth();

    const handleLinkClick = (path, action) => {
        setActiveLink(path);
        if (action) {
          action();
        }
      };

      const handleLogout = () => {
        logout();
        navigate('/passengerlogin', { replace: true });
      };

      useEffect(() => {
        const handleBeforeUnload = (event) => {
          // Check if the user is authenticated or perform any other condition
          if (!isAuthenticated) {
            // Block navigation and show a confirmation dialog
            const message = "You are leaving the page. Your changes may not be saved.";
            event.returnValue = message; // Standard for most browsers
            return message; // For some older browsers
          }
        };
    
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
          // Cleanup the event listener when the component unmounts
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      }, [isAuthenticated]);

    const menuBar=[
        
        {
            path:"/passenger/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/passenger/newreservation",
            name:"New Reservation",
            icon:<FaPlus />
        },
        {
            path:"/passenger/reservations",
            name:"Reservation",
            icon:<FaCar />
        },
        {
            path:"/passenger/profile",
            name:"Profile",
            icon:<FaUser />
        },
        {
           // path:"/passenger/newreservations",
            path:"",
            name:"Settings",
            icon:<IoMdSettings />
        },
        {
            path:"/passengerlogin",
            name:"Logout",
            icon:<BiLogOut />,
            action: handleLogout,
        },

    ];
    

    return(
        <div>
            
            <div>

                <div className="navbar navbar-expand-sm ">

                    <div style={{marginLeft:isOpen? "00px" : "0px"}} className="bars">
                            <FaBars onClick={toggle} />
                    </div>
                    <div className="head">
                        <h3>City Taxi Booking System</h3>
                                
                    </div>

                </div>
                <div className="main">

                    <div style={{width:isOpen? "230px" : "50px"}} className="sidebar">
                        <div className="top_section">
                            
                        </div>
                        {
                            menuBar.map((item,index)=>(
                                <NavLink to={item.path} key={index} className="link" activeclassName="active" onClick={() => handleLinkClick(item.path, item.action)}>
                                    <div className="icon">{item.icon}</div>
                                    <div style={{display: isOpen? "block":"none"}} className="linktext">{item.name}</div>
                                </NavLink>
                                
                            ))
                                            
                        }
                        
                    </div>

                    <div className="content" style={{width:isOpen? "100%" : "-180px", isOpen:false}}>
                        {children}
                       
                    </div>

                </div>
                
                
            </div>

        </div>    
    )
}

export default Bar;