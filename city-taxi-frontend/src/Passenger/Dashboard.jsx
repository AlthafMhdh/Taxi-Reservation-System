import { Component, useEffect } from "react";
import { Link, MemoryRouter } from "react-router-dom";
import '../App.css';
import axios from "axios";
import { useAuth } from "../AuthContex";


class Dashboard extends Component{

    
    constructor(props) {
        super(props);
        this.state = {
            reservations: 0,
            pending:0,
            isLoggedIn: false,
        };
    }

    componentDidMount() {
        
        const id = window.sessionStorage.getItem('id');
        const passengerId = id;

        console.log("your id passengeris", passengerId);
        const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');

        this.setState({isLoggedIn: isLoggedIn})

        axios.get('http://localhost:8082/api/v1/reservation/reservationcount/'+passengerId)
            .then(response => {
                // Update the state with the data received from the backend
                this.setState({ reservations: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching drivers data:', error);
            });


            axios.get('http://localhost:8082/api/v1/reservation/pending/' + passengerId)
            .then(response => {
                // Update the state with the data received from the backend
                if (response.data.code === 200) {
                    // Assuming response.data.data is an array
                    // If it's not an array, adjust accordingly
                    const pendingAmount = response.data.data.map(pending => pending.amount);
                    this.setState({ pending: pendingAmount });
                } else {
                    console.error('Error from the backend:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
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
                                <h4>0{this.state.reservations}</h4>
                            </div>
                            
                            <Link to="/passenger/reservations" style={{textDecoration:"none"}}>
                                <h5>Total Reservation</h5>
                            </Link>   
     
                            
                        </div>
                        
                    </div>  
    
                    <div class="col-md-4">
                        <div className="button-box shadow">
                            
                            <div>
                                <h4>LKR {this.state.pending}.00</h4>
                            </div>
                            
                            <Link to="/passenger/unpaid" style={{textDecoration:"none"}}>
                                <h5>Pending Payments</h5>
                            </Link>
                            
                        </div>
    
                    </div> 
                
                    <div class="col-md-4">
                    
                        <div className="button-box shadow">
                            
                            <div>
                                <h4></h4>
                            </div>
                            <br/>
                            <Link to="/passenger/" style={{textDecoration:"none"}}>
                                <h5>Cancel Reservation</h5>
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