import { Component } from "react";
import '../App.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { wait } from "@testing-library/user-event/dist/utils";

class DriverRegistration extends Component{

    initialState = {
        driver_name:"",
        driver_nic:"",
        driver_email:"",
        Phone_number:"",
        model:"",
        vehicle_num:"",
        capacity:"",

        errors:{
            driver_name:"",
            driver_nic:"",
            driver_email:"",
            Phone_number:"",
            model:"",
            vehicle_num:"",
            capacity:""
        }
        
    }

    state = this.initialState;

    // handleChange =(event)=>{
    //     const {name,value} =event.target;
    //     this.setState({[name]:[value]});

    //     const intValue = parseInt(e.target.value, 10);

    //      // Update the state with the integer value
    //     this.setState({ capacity: intValue });
    // };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validateform  =async ()=>{
        const {driver_name, driver_nic, driver_email, Phone_number,model,vehicle_num,capacity}=this.state;
        const errors = {};

        //Form Validation methods
        if (!driver_name) {
            errors.driver_name="Name is Required.";
        }

        if (!driver_nic) {
            errors.driver_nic="NIC is Required.";
        }

        if (!driver_email) {
            errors.driver_email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(driver_email)) {
            errors.driver_email = "Invalid email format. Please enter a valid email address.";
        }
        else {
            // Check email availability
            try {
              const response = await axios.get(`http://localhost:8082/api/v1/driver/checkEmailAvailability?email=${driver_email}`);
              if (response.data === "Email already exists") {
                errors.driver_email = "Email already exists. Please use a different email address.";
              }
            } catch (error) {
              console.error('Error checking email availability:', error);
            }
        }

        if (!Phone_number) {
            errors.Phone_number="Phonenumber is Required.";
        }        

        if (!model) {
            errors.model="Vehicle model is Required.";
        }

        if (!vehicle_num) {
            errors.vehicle_num="Vehicle Number is Required.";
        }

        if (!capacity) {
            errors.capacity="Seat capacity is Required.";
        }

        

        // Check if there are any errors
        const isValid = Object.values(errors).every((error) => error === "");

        this.setState({ errors });
        return isValid;

    }

    handleSubmit = (driver) => {
        // Your logic to handle the submitted patient data
        console.log("driver form submitted:", driver);
      };

    submitform = async ()=>{
        

       const isValid = await this.validateform();
        if (isValid) {
            const driverData = {
                // driverName: this.state.driver_name,
                // email: this.state.driver_email,
                // nic: this.state.driver_nic,
                // phoneNumber: this.state.Phone_number,
                // model: this.state.model,
                // vehicle_num: this.state.vehicle_num,
                // capacity: this.state.capacity,

                capacity: this.state.capacity,
                driverName: this.state.driver_name,
                email: this.state.driver_email,
                nic: this.state.driver_nic,
                phoneNumber: this.state.Phone_number,
                vehicleModel: this.state.model,
                vehicleNumber: this.state.vehicle_num
            };

            axios.post('http://localhost:8082/api/v1/driver/save', driverData)
                .then(response => {
                    console.log('Patient added successfully');
                 //  alert(response.data);
                   alert("Registration Success.")
                })
                .catch(error => {
                    console.error('Failed to add driver', error);
                    // Optionally handle failure (e.g., show an error message)
                    alert("Failed to add your details");
                })
                .finally(() => {
                    this.setState(this.initialState);
                });
        
        
        }    
    }

    render(){
        const { errors } = this.state;
        return(
            <div className="DRegisterform">
                <h5 style={{textAlign:"center"}}>Driver Registration Form</h5>
                <form handleSubmit={this.handleSubmit}>
                    
                    <div class="row">
                        
                        <div class="col-md-6">
                            <input type="text" name="driver_name" id="name" placeholder="Enter your Name" value={this.state.driver_name} onChange={this.handleChange}/>
                            <div className="error-message">{errors.driver_name}</div>
                            
                            <input type="text" name="driver_nic" id="nic" placeholder="Enter your NIC Number" value={this.state.driver_nic} onChange={this.handleChange}/>
                            <div className="error-message">{errors.driver_nic}</div>
                            
                            <input type="text" name="Phone_number" id="number" placeholder="Enter your Phone Number" value={this.state.driver_number} onChange={this.handleChange}/>
                            <div className="error-message">{errors.Phone_number}</div>
                            
                            <input type="email" name="driver_email" id="email" placeholder="Enter your Email" value={this.state.driver_email} onChange={this.handleChange}/>
                            <div className="error-message">{errors.driver_email}</div>
                                                        
                        </div>
                        <div class="col-md-6">
                            <input type="text" name="model" placeholder="Enter your Vehicle Model" value={this.state.model} onChange={this.handleChange}/>
                            <div className="error-message">{errors.model}</div>
                            
                            <input type="text" name="vehicle_num" placeholder="Enter your Vehicle Number" value={this.state.vehicle_num} onChange={this.handleChange}/>
                            <div className="error-message">{errors.vehicle_num}</div>
                            
                            <input type="number" name="capacity" id="number" placeholder="Enter Vehicle's Seat Capacity" value={this.state.capacity} onChange={this.handleChange}/>
                            <div className="error-message">{errors.capacity}</div>
                           
                        </div>

                        <input type="button" value="Create Driver" className="btn btn-success" style={{width:"40%"}} onClick={this.submitform} />
                    
                    </div>
                    
                    <p>Already have a account <Link to="/driverlogin">Login here</Link></p>
                </form>
            
           </div>
        )
    }
}

export default DriverRegistration;