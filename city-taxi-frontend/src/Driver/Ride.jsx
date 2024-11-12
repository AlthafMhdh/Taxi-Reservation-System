import { Link } from "react-router-dom";
import '../App.css';
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import axios from "axios";
import { Component } from "react";
import Reserve from "./Reserve";
import React, { useState } from 'react';
import Modal from 'react-modal';
import RideModal from "./RideModal";


class Ride extends Component{
    

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 8,
            searchTerm: "",
            rides:[],
            modalIsOpen: false,
            selectedRide: null,
            isRideModalOpen:false,
        };
    }

    viewRide = async ()=>{

    }


    // openModal = (ride) => {
    //     this.setState({ modalIsOpen: true, selectedRide: this.ride });
    // };
    
    openModal = (ride) => {
        const id = window.sessionStorage.getItem('id');
        const driverId = id;
        console.log("Id : ",driverId)

            const reservationId = ride.reservationId;
            const pickupLocation =ride.pickupLocation;
            const droppingLocation = ride.droppingLocation;
             console.log("Reservation Id : ",reservationId)
             console.log("Reservation pickup : ",pickupLocation) 
             console.log("Reservation drop : ",droppingLocation)    
        //update Ride
          const rideData = {
              reservationId: ride.reservationId,
              drivers: driverId  
                   
          };
   
         axios.put('http://localhost:8082/api/v1/reservation/update', rideData)
             .then(response => {
                console.log('Reservation updated successfully');
                this.setState({ modalIsOpen: true, selectedRide: ride });
             })
             .catch(error => {
                 console.error('Failed to update reservation', error);
                 alert("Failed to update reservation");
             })
             .finally(() => {
                 this.setState(this.initialState);
                 this.componentDidMount(); 
             });       
     };
    
    closeModal = () => {
        this.setState({ modalIsOpen: false, rideStarted: false, selectedRide: null });
    };

    startRide = () => {
        this.closeModal();
        this.setState({ isRideModalOpen: true });
        this.setState({reservationId: this.state.selectedRide?.reservationId})
        this.setState({pickup: this.state.selectedRide?.pickupLocation})
        this.setState({drop: this.state.selectedRide?.droppingLocation})
        this.setState({amount:this.state.selectedRide?.amount})
        
    };
    

    componentDidMount() {
        const id = window.sessionStorage.getItem('id');
        const driverId = id;
        // Fetch data from the backend when the component mounts
        axios.get('http://localhost:8082/api/v1/reservation/showRide') 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ rides: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching rides data:', error);
            });
    }

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };


    render(){

        // Check if passengers is undefined or not an array
        if (!Array.isArray(this.state.rides)) {
            return <div>Loading...</div>; // Or handle loading state in another way
            }

        const filteredData = this.state.rides.filter((ride) =>
        Object.keys(ride).some((key) =>
            String(ride[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
        ); 

        const displayData = this.state.searchTerm ? filteredData : this.state.rides;

        const { currentPage, itemsPerPage } = this.state;

        // Calculate start and end indices for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Slice the data to display only the rows for the current page
        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>New Ride</h4>
                </section>

                <div className="pagetable">

                    <div className="clk">

                        <div className="searchbar">
                            <input type="text"style={{borderRadius:"15px"}}  placeholder= " 🔍search..." value={this.state.searchTerm}
                            onChange={this.handleSearch}/>

                        </div>
                        
                    </div>
                    <div className="table-responsive-sm">
                        <table className="table">
                            <thead className="table-active">
                                <tr>
                                    <th>#</th>
                                    <th>Passenger Name</th>
                                    <th>Pickup Location</th>
                                    <th>Drop Location</th>
                                    <th>Distance</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                    {/* <th style={{visibility: "hidden"}}>Phone Number</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((ride)=>(
                                <tr key={ride.reservationId}>
                                    <td>{ride.reservationId}</td>
                                    <td>{ride.passengerName}</td>
                                    <td>{ride.pickupLocation}</td>
                                    <td>{ride.droppingLocation}</td>
                                    <td>{ride.distance} Km</td>
                                    <td>{ride.amount}</td>                                    
                                    {/* <td style={{visibility: "hidden"}}>{ride.phoneNumber}</td> */}
                                    
                                    <td>
                                        <div style={{display:"inline-flex"}}>
                                            <div style={{paddingLeft:"10px"}}>
                                                
                                           
                                                <button
                                                onClick={() => this.openModal(ride)}
                                                className="btn btn-primary"
                                                >
                                                Accept
                                                </button>
                                            

                                                    <Modal
                                                        isOpen={this.state.modalIsOpen}
                                                        onRequestClose={this.state.closeModal}
                                                        style={{
                                                        content: {
                                                            top: '55%',
                                                            left: '55%',
                                                            right: 'auto',
                                                            bottom: 'auto',
                                                            marginRight: '-50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            borderRadius:'10px',
                                                            height:'400px'
                                                        },
                                                        }}
                                                    >
                                                    
                                                    <br/>
                                                    <div style={{marginTop:"-5px"}}>
                                                        <h3>Reservation Information</h3>
                                                    </div>
                                                    <div style={{marginTop:"40px"}}>
                                                        <div>
                                                            Passenger Name : {this.state.selectedRide?.passengerName}
                                                        </div>
                                                        <div style={{marginTop:"15px"}}>
                                                            Pickup Location : {this.state.selectedRide?.pickupLocation}
                                                        </div>
                                                        <div style={{marginTop:"15px"}}>
                                                            Drop Location : {this.state.selectedRide?.droppingLocation}
                                                        </div>
                                                        <div style={{marginTop:"15px"}}>
                                                            Distance : {this.state.selectedRide?.distance} Km
                                                        </div>
                                                        <div style={{marginTop:"15px"}}>
                                                            Phone Number : {this.state.selectedRide?.phoneNumber} 
                                                        </div>

                                                        <div style={{marginTop:"40px",marginLeft:"50px"}}>
                                                            
                                                                <button className="btn btn-primary" style={{width:"80%",padding:"10px"}} onClick={this.startRide}>
                                                                    Start Ride
                                                                </button>
                                                            
                                                        </div>
                                                    </div>

                                                </Modal>
                                            </div>
                                            <div style={{paddingLeft:"10px"}}>
                                                <button className="btn btn-danger">Reject</button>
                                            </div>
                                        </div>
                                        
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        

                        
                    </div>
                        

                </div>


                <RideModal
                    isOpen={this.state.isRideModalOpen}
                    onClose={() => this.setState({ isRideModalOpen: false })}
                    reservationId={this.state.reservationId}
                    pickup={this.state.pickup}
                    drop= {this.state.drop}
                    amount= {this.state.amount}
                />



                <div className="pagination">
                            <button className="buttonpd"
                            onClick={() => this.handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            >
                            <IoArrowBackSharp />
                            </button>
                            <span className="buttonpd">{currentPage}</span>
                            <button  className="buttonpd"
                            onClick={() => this.handlePageChange(currentPage + 1)}
                            disabled={endIndex >= this.state.rides.length}
                            >
                            <IoArrowForward />
                            </button>
                        </div>

            </div>
        )
    }
}

export default Ride;