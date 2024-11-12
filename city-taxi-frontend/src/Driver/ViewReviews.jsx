import { Link } from "react-router-dom";
import '../App.css';
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import axios from "axios";
import { Component } from "react";
import { IoMdStar } from "react-icons/io";



class ViewReviews extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 10,
            searchTerm: "",
            reviews:[]
        };
    }

    componentDidMount() {
        const id = window.sessionStorage.getItem('id');
        const driverId = id;
        // Fetch data from the backend when the component mounts
        axios.get('http://localhost:8082/api/v1/rating/ratings/'+ driverId) 
        .then(response => {
            if (Array.isArray(response.data.data)) {
                this.setState({ reviews: response.data.data });
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

    renderStars = (ratingValue) => {
        const stars = [];
      
        for (let i = 0; i < ratingValue; i++) {
          stars.push(<IoMdStar key={i} />);
        }
      
        return stars;
      };


    render(){

        if (!Array.isArray(this.state.reviews)) {
            return <div>Loading...</div>; // Or handle loading state in another way
            }

        const filteredData = this.state.reviews.filter((review) =>
        Object.keys(review).some((key) =>
            String(review[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
        ); 

        const displayData = this.state.searchTerm ? filteredData : this.state.reviews;

        const { currentPage, itemsPerPage } = this.state;

        // Calculate start and end indices for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Slice the data to display only the rows for the current page
        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

<section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Passenger Reviews</h4>
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
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((review)=>(
                                <tr key={review.ratingId}>
                                    <td>{review.ratingId}</td>
                                    <td>{new Date(review.reservationDate).toLocaleDateString('en-GB')}</td>
                                    <td>{review.passengerName}</td>
                                    <td>{review.pickupLocation}</td>
                                    <td>{review.dropLocation}</td>
                                    <td>{this.renderStars(review.ratingValue)}</td>
                                    {/* <td>{review.ratingValue}<IoMdStar /></td> */}
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
                            disabled={endIndex >= this.state.reviews.length}
                            >
                            <IoArrowForward />
                            </button>
                        </div>

            </div>
        )
    }
}

export default ViewReviews;