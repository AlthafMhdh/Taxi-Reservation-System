import { Component } from "react";
import '../App.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { IoArrowBack } from "react-icons/io5";
import React, { useState, useEffect, useRef } from 'react';

class Registration extends Component{

    initialState = {
        passenger_name:"",
        passenger_nic:"",
        passenger_email:"",
        Phonenumber:"",

        errors:{
            passenger_name:"",
            passenger_nic:"",
            passenger_email:"",
            Phonenumber:""
        }
        
    }

    state = this.initialState;


    handleChange =(event)=>{
        const {name,value} =event.target;
        this.setState({[name]:value});
    };

    validateform = async()=>{
        const {passenger_name, passenger_nic, passenger_email, Phonenumber}=this.state;
        const errors = {};

        //Form Validation methods
        if (!passenger_name) {
            errors.passenger_name="Name is Required.";
        }

        if (!passenger_nic) {
            errors.passenger_nic="NIC is Required.";
        }

        if (!passenger_email) {
            errors.passenger_email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger_email)) {
            errors.passenger_email = "Invalid email format. Please enter a valid email address.";
        }
        else {
            // Check email availability
            try {
              const response = await axios.get(`http://localhost:8082/api/v1/passenger/checkEmailAvailability?email=${passenger_email}`);
              if (response.data === "Email already exists") {
                errors.passenger_email = "Email already exists. Please use a different email address.";
              }
            } catch (error) {
              console.error('Error checking email availability:', error);
            }
        }
         

        if (!Phonenumber) {
            errors.Phonenumber="Phonenumber is Required.";
        }

        // Check if there are any errors
        const isValid = Object.values(errors).every((error) => error === "");

        this.setState({ errors });
        return isValid;

    }

    handleSubmit = (passenger) => {
        // Your logic to handle the submitted patient data
        console.log("Passenger form submitted:", passenger);
      };

    submitform = async ()=>{
        

       const isValid = await this.validateform();
        if (isValid) {
            const passengerData = {
                passengerName: this.state.passenger_name,
                nic: this.state.passenger_nic,
                email: this.state.passenger_email,
                phoneNumber: this.state.Phonenumber,

            };

            axios.post('http://localhost:8082/api/v1/passenger/save', passengerData)
                .then(response => {
                    console.log('Passenger added successfully');
                //   alert(response.data.data);
                    alert("Registration Success.")
                })
                .catch(error => {
                    console.error('Failed to add passenger', error);
                    // Optionally handle failure (e.g., show an error message)
                    alert("Failed to add passenger");
                })
                .finally(() => {
                    this.setState(this.initialState);
                });
        
        
        }    
    }

    render(){
        const { errors } = this.state;
        return(
            <div className="Registerform">
                <h5 style={{textAlign:"center"}}>Passenger Registration Form</h5>
                <form handleSubmit={this.handleSubmit}>
                    
                    <input type="text" name="passenger_name" id="name" placeholder="Enter your Name"  value={this.state.passenger_name} onChange={this.handleChange}/>
                        <div className="error-message">{errors.passenger_name}</div>
                            
                    <input type="text" name="passenger_nic" id="nic" placeholder="Enter your NIC Number"  value={this.state.passenger_nic} onChange={this.handleChange}/>
                        <div className="error-message">{errors.passenger_nic}</div>
                            
                    <input type="text" name="Phonenumber" id="number" placeholder="Enter your Phone number"  value={this.state.Phonenumber} onChange={this.handleChange}/>
                        <div className="error-message">{errors.Phonenumber}</div>
                                                        
                    <input type="email" name="passenger_email" id="email" placeholder="Enter your Email" value={this.state.passenger_email} onChange={this.handleChange}/>
                        <div className="error-message">{errors.passenger_email}</div>
                                         
                    <input type="button" value="Create Passenger" className="btn btn-success" onClick={this.submitform} />
                    <br/>
                    <p>Already have a account <Link to="/passengerlogin">Login here</Link></p>
                </form>
                 
           </div>
        )
    }
}

export default Registration;