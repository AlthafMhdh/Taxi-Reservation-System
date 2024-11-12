import { Component } from "react";
import axios from "axios";
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";


class ViewOperator extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 8,
            searchTerm: "",
            operators:[],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8082/api/v1/operator/get-all-operators-by-activestatus')
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    // Update the state with the data received from the backend
                    this.setState({ operators: response.data.data });


                } else {
                    
                    console.error('Invalid data format received from the backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching operators data:', error);
            });
    }
    
    


    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };


    render(){

        const filteredData = this.state.operators.filter((operator) =>
        Object.keys(operator).some((key) =>
            String(operator[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
        ); 

        const displayData = this.state.searchTerm ? filteredData : this.state.operators;

        const { currentPage, itemsPerPage } = this.state;

        // Calculate start and end indices for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;


        // Slice the data to display only the rows for the current page
        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Operators</h4>
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
                                    <th>Operator Name</th>
                                    <th>NIC</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Registed Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((operator)=>(
                                <tr key={operator.operatorId}>
                                    <td>{operator.operatorId}</td>
                                    <td>{operator.operatorName}</td>
                                    <td>{operator.nic}</td>
                                    <td>{operator.email}</td>
                                    <td>{operator.phoneNumber}</td>
                                <td>{new Date(operator.registedDate).toLocaleDateString('en-GB')}</td> 
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
                            disabled={endIndex >= this.state.operators.length}
                            >
                            <IoArrowForward />
                            </button>
                        </div>

            </div>
        )
    }

}

export default ViewOperator;