import { Component } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import axios from "axios";


class DriverDashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            rides: 0,
            isLoggedIn: false,
        };
    }

    componentDidMount() {

        const id = window.sessionStorage.getItem('id');
        const driverId = id;

        console.log("your driver id is", driverId);
        const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');

        this.setState({isLoggedIn: isLoggedIn})


        // Fetch data from the backend when the component mounts
        axios.get('http://localhost:8082/api/v1/reservation/ridecount/'+driverId)
            .then(response => {
                // Update the state with the data received from the backend
                this.setState({ rides: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching drivers data:', error);
            });
        }
    render(){
        if (!this.state.isLoggedIn){
            return (<Link to={'/driverlogin'}>You are signed out, please login to continue.</Link>);
        } else{

            return(
            <div >
                
            
            <div class="row" style={{marginTop:"50px"}}>
                <div class="col-md-4">
                    <div className="button-box shadow">
                        
                        <div>
                            <h4>0{this.state.rides}</h4>
                        </div>
                        
                        <Link to="/driver/rides" style={{textDecoration:"none"}}>
                            <h5>Total Rides</h5>
                        </Link> 
                        
                    </div>

                    <div className="button-box shadow">
                        
                        <div>
                            <h4></h4>
                        </div>
                        
                        <Link to="/driver/newbooking" style={{textDecoration:"none"}}>
                            <h5>New Booking Rides</h5>
                        </Link> 
                        
                    </div>
                </div>  

                <div class="col-md-4">
                    <div className="button-box shadow">
                        
                        <div>
                            <h4></h4>
                        </div>
                        
                        <Link to="/driver/earnings" style={{textDecoration:"none"}}>
                            <h5>Total Earning</h5>
                        </Link> 
                        
                    </div>

                    <div className="button-box shadow">
                        
                        <div>
                            <h4></h4>
                        </div>
                        
                        <Link to="/driver/booking" style={{textDecoration:"none"}}>
                            <h5>Booking Ride Details</h5>
                        </Link> 
                        
                    </div>
                                        
                
                </div> 
            
                <div class="col-md-4">
                
                    <div className="button-box shadow">
                        
                        <div>
                            <h4></h4>
                        </div>
                        
                        <Link to="/driver/newride" style={{textDecoration:"none"}}>
                            <h5>New Rides</h5>
                        </Link> 
                        
                    </div>
                </div>
            </div>   
          </div>  
        )
            }
    }
}
export default DriverDashboard;