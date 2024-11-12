import { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import axios from "axios";
import { useAuth } from "../AuthContex";


class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };
    }
    

    componentDidMount() {
       

        const id = window.sessionStorage.getItem('id');
        const operatorId = id;

        console.log("your id operator is", operatorId);
        const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');

        this.setState({isLoggedIn: isLoggedIn})


    }

    render(){
        if (!this.state.isLoggedIn) {
            return (<Link to={'/operatorlogin'}>You are signed out, please login to continue.</Link>);
        } else {
        return(
            <div >
                
            
            <div class="row" style={{marginTop:"50px"}}>
                <div class="col-md-4">
                    <div className="button-box shadow">
                        
                        <div>
                            <h4></h4>
                        </div>
                        
                        <Link to="/operator/booking" style={{textDecoration:"none"}}>
                            <h5>View Booking</h5>
                        </Link>   
 
                        
                    </div>
                    
                </div>  

                <div class="col-md-4">
                    <div className="button-box shadow">
                        
                        <div>
                            <h4></h4>
                        </div>
                        
                        <Link to="/operator/newbooking" style={{textDecoration:"none"}}>
                            <h5>New Booking</h5>
                        </Link>
                        
                    </div>

                </div> 
            
                <div class="col-md-4">
                
                    <div className="button-box shadow">
                        
                        <div>
                            <h4></h4>
                        </div>
                        
                        <Link to="/operator/" style={{textDecoration:"none"}}>
                            <h5>Cancel Booking</h5>
                        </Link>
                        
                    </div>

                </div>
            </div>   
          </div>  
        )
        }
    }
}
export default Dashboard;