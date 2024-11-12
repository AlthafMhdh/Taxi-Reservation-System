import { Link } from "react-router-dom";
import '../App.css';
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import axios from "axios";
import { Component } from "react";



class BookingDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 8,
            searchTerm: "",
            bookings:[]
        };
    }

    componentDidMount() {
        const id = window.sessionStorage.getItem('id');
        const operatorId = id;
        console.log("your id operator is", operatorId);
        // Fetch data from the backend when the component mounts
        axios.get("http://localhost:8082/api/v1/booking/BookingHistory/"+ operatorId)
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ bookings: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching bookings data:', error);
            });
    }
    

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };


    render(){

        if (!Array.isArray(this.state.bookings)) {
            return <div>Loading...</div>; // Or handle loading state in another way
            }

        const filteredData = this.state.bookings.filter((booking) =>
        Object.keys(booking).some((key) =>
            String(booking[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
        ); 

        const displayData = this.state.searchTerm ? filteredData : this.state.bookings;

        const { currentPage, itemsPerPage } = this.state;

        // Calculate start and end indices for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Slice the data to display only the rows for the current page
        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Booking Details</h4>
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
                                    <th>Booking Id</th>
                                    <th>Passenger Name</th>
                                    <th>Phone Number</th>
                                    <th>Booking Date</th>
                                    <th>Pickup Location</th>
                                    <th>Drop Location</th>
                                    <th>Distance</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((booking)=>(
                                <tr key={booking.bookingId}>
                                    <td>{booking.bookingId}</td>
                                    <td>{booking.passengerName}</td>
                                    <td>{booking.phoneNumber}</td>
                                    <td>{new Date(booking.bookingDate).toLocaleDateString('en-GB')}</td>
                                    <td>{booking.pickupLocation}</td>
                                    <td>{booking.droppingLocation}</td>
                                    <td>{booking.distance} Km</td>
                                    <td>{booking.amount}</td>
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
                            disabled={endIndex >= this.state.bookings.length}
                            >
                            <IoArrowForward />
                            </button>
                        </div>

            </div>
        )
    }
}

export default BookingDetails;