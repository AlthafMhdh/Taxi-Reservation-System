import { Component } from "react";
import axios from "axios";

class MyProfile extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          profileData: {
            passengerId: "",
            passengerName: "",
            email: "",
            nic: "",
            phoneNumber: "",
            registrationDate: ""
          }
        };
      }

      componentDidMount() {
        const id = window.sessionStorage.getItem('id');
        const passengerId = id;
        console.log("Passenger Id: ",passengerId)
        
        axios.get("http://localhost:8082//api/v1/passenger/profile/"+ passengerId)
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ profileData: response.data.data[0] });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching reservations data:', error);
            });
    }

render(){

    const {
        passengerId,
        passengerName,
        email,
        nic,
        phoneNumber,
        registrationDate
      } = this.state.profileData;

    return(
        <div>
            <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>My Profile</h4>
            </section>
            <br/><br/>

            <div className="row">
                <div className="col-md-1">

                </div>
                <div className="col-md-5">
                    <div style={{paddingTop:"20px", }}>
                        <b>ID : </b>  {passengerId}
                    </div>
                    <div style={{paddingTop:"20px", }}>
                        <b>Name : </b>  {passengerName}
                    </div>
                    <div style={{paddingTop:"20px"}}>
                        <b>Email : </b> {email}
                    </div>
                    <div style={{paddingTop:"20px"}}>
                        <b>NIC : </b> {nic}
                    </div>
                    <div style={{paddingTop:"20px"}}>
                        <b>Phone Number : </b> {phoneNumber}
                    </div>
                    <div style={{paddingTop:"20px"}}>
                        <b>Registered Date : </b> {new Date(registrationDate).toLocaleDateString('en-GB')}
                    </div>
                </div>
            </div>

        </div>
    )
}

}

export default MyProfile;