import { Component } from "react";
import axios from "axios";

class Profile extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          profileData: {
            operatorId: "",
            operatorName: "",
            email: "",
            nic: "",
            phoneNumber: "",
            registedDate: ""
          }
        };
      }

      componentDidMount() {
        const id = window.sessionStorage.getItem('id');
        const operatorId = id;
        console.log("your id operator is", operatorId);
        
        // Fetch data from the backend when the component mounts
        axios.get("http://localhost:8082//api/v1/operator/profile/"+ operatorId)
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
        operatorId,
        operatorName,
        nic,
        email,
        phoneNumber,
        registedDate
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
                        <b>Id : </b>  {operatorId}
                    </div>
                    <div style={{paddingTop:"20px", }}>
                        <b>Name : </b>  {operatorName}
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
                        <b>Registered Date : </b> {new Date(registedDate).toLocaleDateString('en-GB')}
                    </div>
                </div>
            </div>

        </div>
    )
}

}

export default Profile;