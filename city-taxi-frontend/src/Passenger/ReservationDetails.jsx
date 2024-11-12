import { Component } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import axios from "axios";



class ReservationDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 10,
            searchTerm: "",
            reservations:[]
        };
    }

    componentDidMount() {
        const id = window.sessionStorage.getItem('id');
        const passengerId = id;
        console.log("Id: ",passengerId)

        // Fetch data from the backend when the component mounts
        axios.get("http://localhost:8082/api/v1/reservation/ReservationHistory/"+ passengerId)
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ reservations: response.data.data });
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

        if (!Array.isArray(this.state.reservations)) {
            return <div>Loading...</div>; // Or handle loading state in another way
            }

        const filteredData = this.state.reservations.filter((reservation) =>
        Object.keys(reservation).some((key) =>
            String(reservation[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
        ); 

        const displayData = this.state.searchTerm ? filteredData : this.state.reservations;

        const { currentPage, itemsPerPage } = this.state;

        // Calculate start and end indices for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Slice the data to display only the rows for the current page
        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

            <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Reservation Details</h4>
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
                                    <th>Driver Name</th>
                                    <th>Vehicle Number</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Distance</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((reservation)=>(
                                <tr key={reservation.reservationId}>
                                    <td>{reservation.reservationId}</td>
                                    <td>{new Date(reservation.reservationDate).toLocaleDateString('en-GB')}</td>
                                    <td>{reservation.driverName}</td>
                                    <td>{reservation.vehicleNumber}</td>
                                    <td>{reservation.pickupLocation}</td>
                                    <td>{reservation.droppingLocation}</td>
                                    <td>{reservation.distance} Km</td>
                                    <td>{reservation.amount}</td>
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
                            disabled={endIndex >= this.state.reservations.length}
                            >
                            <IoArrowForward />
                            </button>
                </div>               
            </div>
        )
    }
}

export default ReservationDetails;