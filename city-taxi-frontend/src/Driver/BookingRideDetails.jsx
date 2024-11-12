import { Link } from "react-router-dom";
import '../App.css';
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import axios from "axios";
import { Component } from "react";
import { IoMdStar } from "react-icons/io";



class BookingDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 10,
            searchTerm: "",
            rides:[]
        };
    }

    componentDidMount() {
        const id = window.sessionStorage.getItem('id');
        const driverId = id;
        // Fetch data from the backend when the component mounts
        axios.get('http://localhost:8082/api/v1/booking/BookingRides/'+ driverId) 
        .then(response => {
            if (Array.isArray(response.data.data)) {
                this.setState({ rides: response.data.data });
            } else {
                console.error('Invalid data format from the backend:', response.data);
            }
        })
        .catch(error => {
            console.error('Error fetching reservations data:', error);
        });
    }

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };


    render(){

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
                        <h4 style={{paddingLeft:"50px"}}>Booking Rides History</h4>
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
                                    <th>Date</th>
                                    <th>Passenger Name</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Distance</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((ride)=>(
                                    <tr key={ride.bookingId}>
                                        <td>{ride.bookingId}</td>
                                        <td>{new Date(ride.bookingDate).toLocaleDateString('en-GB')}</td>
                                        <td>{ride.passengerName}</td>
                                        <td>{ride.pickupLocation}</td>
                                        <td>{ride.droppingLocation}</td>
                                        <td>{ride.distance} Km</td>
                                        <td>{ride.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        
                    </div>
                        

                </div> 

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

export default BookingDetails;