import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../App.css';




class AdminDashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            drivers: 0,
            passengers:0,
            operators:0,
            isLoggedIn: false
        };
    }

    componentDidMount() {

        const id = window.sessionStorage.getItem('id');

        const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');

        this.setState({isLoggedIn: isLoggedIn})

        console.log('---------------- ', isLoggedIn)

        // Fetch data from the backend when the component mounts
        axios.get('http://localhost:8082/api/v1/driver/count')
            .then(response => {
                // Update the state with the data received from the backend
                this.setState({ drivers: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching drivers data:', error);
            });

        axios.get('http://localhost:8082/api/v1/passenger/count')
            .then(response => {
                // Update the state with the data received from the backend
                this.setState({ passengers: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching passengers data:', error);
            });

        axios.get('http://localhost:8082/api/v1/operator/count')
            .then(response => {
                // Update the state with the data received from the backend
                this.setState({ operators: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching operators data:', error);
            });
    }


    render(){
        if (!this.state.isLoggedIn) {
            // window.location.replace("/passengerlogin")
            return (<Link to={'/passengerlogin'}>You are signed out, please login to continue.</Link>);
        } else {
        return(
            <div >
                
            
            <div class="row" style={{marginTop:"50px"}}>
                <div class="col-md-4">
                    <div className="button-box shadow">
                        
                        <div>
                            <h4>0{this.state.drivers}</h4>
                        </div>
                        
                        <Link to="/admin/drivers" style={{textDecoration:"none"}}>
                            <h5>Total Drivers</h5>
                        </Link> 
                        
                    </div>

                    <div className="button-box shadow">
                        
                        <br/>
                        <Link to="/admin/newoperator" style={{textDecoration:"none"}}>
                            <h5>New Operator</h5>
                        </Link> 
                        
                    </div>
                    <div className="button-box shadow">
                        
                        
                        <Link to="/admin/suspenddriver" style={{textDecoration:"none"}}>
                            <h5>Suspended<br/> Drivers</h5>
                        </Link> 
                        
                    </div>
                </div>  

                <div class="col-md-4">
                    <div className="button-box shadow">
                        
                        <div>
                            <h4>0{this.state.operators}</h4>
                        </div>
                        
                        <Link to="/admin/operators" style={{textDecoration:"none"}}>
                            <h5>Total Operators</h5>
                        </Link> 
                        
                    </div>

                    <div className="button-box shadow">
                        
                        <br/>
                        <Link to="/admin/reservations" style={{textDecoration:"none"}}>
                            <h5>All Reservation</h5>
                        </Link> 
                        
                    </div>
                    <div className="button-box shadow">
                        
                        
                        <Link to="/admin/suspendoperator" style={{textDecoration:"none"}}>
                            <h5>Suspended<br/> Operators</h5>
                        </Link> 
                        
                    </div>
                    
                
                </div> 
            
                <div class="col-md-4">
                
                    <div className="button-box shadow">
                        
                        <div>
                            <h4>0{this.state.passengers}</h4>
                        </div>
                        
                        <Link to="/admin/passengers" style={{textDecoration:"none"}}>
                            <h5>Total Passengers</h5>
                        </Link> 
                        
                    </div>
                    <div className="button-box shadow">
                        
                        
                        <Link to="/admin/" style={{textDecoration:"none"}}>
                            <h5>Suspended<br/> Passengers</h5>
                        </Link> 
                        
                    </div>
                    <div className="button-box shadow">
                        
                        <br/>
                        <Link to="/admin/reservations" style={{textDecoration:"none"}}>
                            <h5>All Bookings</h5>
                        </Link> 
                        
                    </div>
                </div>
            </div>   
          </div>  
        )
        }
    }
}
export default AdminDashboard;

