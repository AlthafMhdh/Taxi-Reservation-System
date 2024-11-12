import React, { useState } from "react";
import '../App.css';
import { BiLogOut } from "react-icons/bi";
import {} from 'react-icons';
import { IoMdSettings } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { FaUser,FaBars,FaTh } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContex";


const SideB =({children}) =>{
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] =useState(true);
    const toggle =()=>setIsOpen(!isOpen);

    const [activeLink, setActiveLink] = useState("/"); // Default active link

    const handleLinkClick = (path, action) => {
        setActiveLink(path);
        if (action) {
          action();
        }
      };

      const handleLogout = () => {
        logout();
        navigate('/adminlogin', { replace: true });
      };
      
    const menuBar=[
        
        {
            path:"/admin/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/admin/passengers",
            name:"Passengers",
            icon:<FaUser/>
        },
        {
            path:"/admin/drivers",
            name:"Drivers",
            icon:<FaUser/>
        },
        {
            path:"/admin/operators",
            name:"Operator",
            icon:<FaUser />
        },        
        {
            path:"/admin/",
            name:"Earning Details",
            icon:<MdAttachMoney />
        },
        {
            path:"/admin/profile",
            name:"Profile",
            icon:<FaUser />
        },
        {
            path:"/admin/",
            name:"Settings",
            icon:<IoMdSettings />
        },
        {
            path:"/",
            name:"Logout",
            icon:<BiLogOut />,
            action: handleLogout
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

export default SideB;