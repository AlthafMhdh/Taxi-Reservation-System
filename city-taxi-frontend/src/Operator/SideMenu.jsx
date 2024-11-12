import React, { useState, useEffect } from "react";
import '../App.css';
import { BiLogOut } from "react-icons/bi";
import {} from 'react-icons';
import { FaPlus } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaUser,FaBars,FaTh } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContex";


const SideMenu =({children}) =>{

    const [isOpen, setIsOpen] =useState(true);
    const toggle =()=>setIsOpen(!isOpen);

    const [activeLink, setActiveLink] = useState("");
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
        navigate('/operatorlogin', { replace: true });
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
            path:"/operator/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/operator/newbooking",
            name:"New Booking",
            icon:<FaPlus />
        },
        {
            path:"/operator/booking",
            name:"Booking",
            icon:<FaCar/>
        },
        {
            path:"/operator/profile",
            name:"Profile",
            icon:<FaUser />
        },
        {
            path:"/operator/settings",
            name:"Settings",
            icon:<IoMdSettings />
        },
        {
            path:"/operatorlogin",
            name:"Logout",
            icon:<BiLogOut />,
            action: handleLogout,
        },


    ]

    

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

export default SideMenu;