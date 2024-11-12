import { Component } from "react";
import axios from "axios";
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";


class ViewDrivers extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 8,
            searchTerm: "",
            drivers:[]
        };
    }

    componentDidMount() {
        // Fetch data from the backend when the component mounts
        axios.get('http://localhost:8082/api/v1/driver/get-all-drivers-admin') 
            .then(response => {
                // Update the state with the data received from the backend
                this.setState({ drivers: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching drivers data:', error);
            });
    }


    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };

    renderStars = (ratingValue) => {
        const stars = [];
      
        for (let i = 0; i < ratingValue; i++) {
          stars.push(<IoMdStar key={i} />);
        }
      
        return stars;
    };


    render(){

        const filteredData = this.state.drivers.filter((driver) =>
        Object.keys(driver).some((key) =>
            String(driver[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
        ); 

        const displayData = this.state.searchTerm ? filteredData : this.state.drivers;

        const { currentPage, itemsPerPage } = this.state;

        // Calculate start and end indices for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Slice the data to display only the rows for the current page
        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Drivers</h4>
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
                                    <th>Driver Name</th>
                                    <th>NIC</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Vehicle Model</th>
                                    <th>Vehicle Number</th>
                                    <th>Registed Date</th>
                                    <th>Rating</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((driver)=>(
                                <tr key={driver.driverId}>
                                    <td>{driver.driverId}</td>
                                    <td>{driver.driverName}</td>
                                    <td>{driver.nic}</td>
                                    <td>{driver.email}</td>
                                    <td>{driver.phoneNumber}</td>
                                    <td>{driver.vehicleModel}</td>
                                    <td>{driver.vehicleNumber}</td>
                                    <td>{new Date(driver.registrationDate).toLocaleDateString('en-GB')}</td>
                                    <td>{this.renderStars(driver.averageRating)}</td>
                                    <td>
                                        <div style={{display:"inline-flex"}}>
                                            
                                            <div style={{paddingLeft:"10px"}}>
                                                <button className="btn btn-danger">Suspend</button>
                                            </div>
                                        </div>
                                        
                                    </td>
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
                            disabled={endIndex >= this.state.drivers.length}
                            >
                            <IoArrowForward />
                            </button>
                        </div>

            </div>
        )
    }

}

export default ViewDrivers;