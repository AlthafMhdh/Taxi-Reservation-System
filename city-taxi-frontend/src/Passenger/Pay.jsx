import { Link } from "react-router-dom";
import '../App.css';
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import axios from "axios";
import { Component } from "react";
import Modal from 'react-modal';
import PaymentSuccessModal from './PaymentSuccessModal'; 



class Pay extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 8,
            searchTerm: "",
            unpays:[],
            modalIsOpen: false,
            selectedRide: null,
            isPaymentSuccessModalOpen: false,
            modalFormErrors: {
                amount: "",
                name: "",
                cardnumber: "",
                code: "",
                date: "",
            },
        };
    }

    initialState = {
        amount:"",
        name:"",
        cardnumber:"",
        code:"",
        date:"",

    }
    
    state = this.initialState;

    openModal = (unpay) => {
        this.setState({ modalIsOpen: true, selectedPay: unpay });
    };
    
    closeModal = () => {
        this.setState({ modalIsOpen: false, payStarted: false, selectedPay: null });
    };

    startPay = () => {
        this.setState({ payStarted: true });
    };

    componentDidMount() {
        const id = window.sessionStorage.getItem('id');
        const passengerId = id;
        console.log("Id: ",passengerId)

        axios.get('http://localhost:8082/api/v1/reservation/Unpay/'+ passengerId) 
        .then(response => {
            if (Array.isArray(response.data.data)) {
                this.setState({ unpays: response.data.data });
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

    validateform = async()=>{
        const {name, cardnumber, code, date}= this.state;
        const {amount} = this.state.selectedPay;
        
        const modalFormErrors = {};

        if (!amount){
            modalFormErrors.amount = "Enter amount."
        }
        if (!name){
            modalFormErrors.name = "Enter card holder name."
        }
        if(!cardnumber){
            modalFormErrors.cardnumber = "Enter card number"
        }
        else if (!/^\d{16}$/.test(cardnumber)) {
            modalFormErrors.cardnumber = "Card number must be a 16-digit number.";
        }
        if (!code){
            modalFormErrors.code = "Enter 3-digit code "
        }
        else if (!/^\d{3}$/.test(code)) {
            modalFormErrors.code = "Code must be a 3-digit number.";
        }
        if (!date){
            modalFormErrors.date = "Enter the Expiry date"
        }

        // Set errors in state
        this.setState({ modalFormErrors });

        const isValid = Object.values(modalFormErrors).every((error) => error === "");
    
        return isValid;

    }

    submitPayment = async ()=>{
    
        const isValid = await this.validateform();
        if (isValid) {

          //  alert("Payment successful!");
            this.closeModal();
            this.setState({ isPaymentSuccessModalOpen: true });
            this.setState({ reservation: this.state.selectedPay.reservationId });
             const payData = {
                 reservations: this.state.selectedPay?.reservationId            
             };
        
             axios.put('http://localhost:8082/api/v1/payment/updatePayment', payData)
                 .then(response => {
                    console.log('Payment added successfully');
                    this.closeModal();
                    this.setState({ isPaymentSuccessModalOpen: true });
                 })
                 .catch(error => {
                     console.error('Failed to add payment', error);
                     alert("Failed to add payment");
                 })
                 .finally(() => {
                     this.setState(this.initialState);
                     this.componentDidMount(); 
                 });
            
        }  
         
      };

    render(){

        if (!Array.isArray(this.state.unpays)) {
            return <div>Loading...</div>; // Or handle loading state in another way
            }

        const filteredData = this.state.unpays.filter((unpay) =>
        Object.keys(unpay).some((key) =>
            String(unpay[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
        ); 

        const displayData = this.state.searchTerm ? filteredData : this.state.unpays;

        const { currentPage, itemsPerPage } = this.state;

        // Calculate start and end indices for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Slice the data to display only the rows for the current page
        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>UnPaid Reservations </h4>
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
                                    <th>Pickup Location</th>
                                    <th>Drop Location</th>
                                    <th>Vehicle Number</th>
                                    <th>Distance</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((unpay)=>(
                                <tr key={unpay.reservationId}>
                                    <td>{unpay.reservationId}</td>
                                    <td>{unpay.droppingLocation}</td>
                                    <td>{unpay.pickupLocation}</td>                                   
                                    <td>{unpay.vehicleNumber}</td>
                                    <td>{unpay.distance} Km</td>                                
                                    <td>Rs {unpay.amount}</td>
                                    <td>
                                        <div style={{display:"inline-flex"}}>
                                            <div style={{paddingLeft:"10px"}}>
                                                                                          
                                                <button
                                                onClick={() => this.openModal(unpay)}
                                                className="btn btn-primary"
                                                >
                                                Pay Now
                                                </button>
                                            

                                                    <Modal
                                                        isOpen={this.state.modalIsOpen}
                                                        onRequestClose={this.state.closeModal}
                                                        style={{
                                                        content: {
                                                            top: '50%',
                                                            left: '55%',
                                                            right: 'auto',
                                                            bottom: 'auto',
                                                            marginRight: '-50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            borderRadius:'10px',
                                                            height:'600px',
                                                            width:'400px'
                                                        },
                                                        }}
                                                    >
                                                    <button onClick={this.closeModal} style={{ position: "absolute", top: "10px", right: "10px", border: "none", background: "none", fontSize: "20px", cursor: "pointer" }}>
                                                        &times;
                                                    </button>
                                                    <br/>
                                                    <div style={{marginTop:"-5px"}}>
                                                        <h3 style={{textAlign:"center"}}>Payment Here...</h3>
                                                        {/* <p>{this.state.selectedPay?.reservationId}</p> */}
                                                            <div className="error-message">{this.state.modalFormErrors.cardnumber}</div>
                                                            <div className="error-message">{this.state.modalFormErrors.name}</div>
                                                            <div className="error-message">{this.state.modalFormErrors.date}</div>
                                                            <div className="error-message">{this.state.modalFormErrors.code}</div>
                                                    </div>
                                                    <div style={{marginTop:"40px"}}>
                                                    <div>
                                                        <label style={{ marginRight: "10px", fontWeight: "bold", fontSize: "16px" }}>Amount </label>
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            <label style={{width:"150px",padding: "8px",textAlign:"center",borderRadius: "5px",border: "1px solid #ccc",height:"40px"}}><b>LKR</b></label>
                                                            <input
                                                                type="text"
                                                                required
                                                                name="amount"
                                                                id="amount"

                                                                value={this.state.selectedPay?.amount || ""}
                                                                onChange={(e) => {
                                                                    // Handle input changes and update the state
                                                                    this.setState((prevState) => ({
                                                                        selectedPay: {
                                                                            ...prevState.selectedPay,
                                                                            amount: e.target.value,
                                                                        },
                                                                    }));
                                                                }}
                                                                readOnly
                                                                style={{
                                                                    padding: "8px",
                                                                    borderRadius: "5px",
                                                                    border: "1px solid #ccc",
                                                                    fontSize: "16px",
                                                                    textAlign: "right",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label style={{ marginTop: "10px", fontWeight: "bold", fontSize: "16px" }}>Card Number</label>
                                                        {/* Add the input field for the card number here */}
                                                        <input
                                                            type="text"
                                                            name="cardnumber"
                                                            id="cardnumber"
                                                            value={this.state.cardnumber}
                                                            required
                                                            style={{
                                                                marginTop: "5px",
                                                                padding: "8px",
                                                                borderRadius: "5px",
                                                                border: "1px solid #ccc",
                                                                fontSize: "16px",
                                                                textAlign: "right",
                                                            }}
                                                            /* ... other attributes ... */
                                                            onChange={(e) => this.setState({ cardnumber: e.target.value })}
                                                        />
                                                            
                                                    </div>

                                                    <div>
                                                        <label style={{ marginTop: "10px", fontWeight: "bold", fontSize: "16px" }}>Cardholder Name</label>
                                                        {/* Add the input field for the card number here */}
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            value={this.state.name}
                                                            required
                                                            style={{
                                                                marginTop: "5px",
                                                                padding: "8px",
                                                                borderRadius: "5px",
                                                                border: "1px solid #ccc",
                                                                fontSize: "16px",
                                                                textAlign: "right",
                                                            }}
                                                            /* ... other attributes ... */
                                                            onChange={(e) => this.setState({ name: e.target.value })}
                                                        />
                                                            
                                                    </div>

                                                    <div>
                                                        <label style={{ marginTop: "10px",marginLeft:"10px" ,fontWeight: "bold", fontSize: "16px" }}>Security Code</label>
                                                        <label style={{ marginTop: "10px",marginLeft:"150px", fontWeight: "bold", fontSize: "16px" }}>Expiry</label>
                                                        <input
                                                            type="text"
                                                            name="code"
                                                            id="code"
                                                            value={this.state.code}
                                                            required
                                                            style={{
                                                                marginTop: "5px",
                                                                padding: "8px",
                                                                borderRadius: "5px",
                                                                border: "1px solid #ccc",
                                                                fontSize: "16px",
                                                                width:"40%",
                                                                textAlign: "right",
                                                                
                                                            }}
                                                            /* ... other attributes ... */
                                                            onChange={(e) => this.setState({ code: e.target.value })}
                                                        />

                                                        <input
                                                            type="text"
                                                            placeholder="MM/YY"
                                                            name="date"
                                                            id="date"
                                                            value={this.state.date}
                                                            required
                                                            style={{
                                                                marginTop: "5px",
                                                                padding: "8px",
                                                                borderRadius: "5px",
                                                                border: "1px solid #ccc",
                                                                fontSize: "16px",
                                                                width:"40%",
                                                                marginLeft:"70px",
                                                                textAlign: "right",
                                                                position:"fixed",
                                                            }}
                                                            /* ... other attributes ... */
                                                            onChange={(e) => this.setState({ date: e.target.value })}
                                                        />
                                                        
                                                    </div>

                                                    </div>
                                                    <div style={{marginTop:"40px"}}>
                                                        
                                                     

                                                        <div style={{marginTop:"50px",marginLeft:"50px"}}>                                                           
                                                            <button className="btn btn-success" style={{width:"80%",padding:"10px"}} onClick={this.submitPayment}>
                                                                Pay Now
                                                            </button>  
                                                            
                                                        </div>
                                                    </div>
                                                    
                                                    </Modal>
                                                </div>
                                            </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        
                    </div>
                        

                </div> 

                <PaymentSuccessModal
                    isOpen={this.state.isPaymentSuccessModalOpen}
                    onClose={() => this.setState({ isPaymentSuccessModalOpen: false })}
                    reservation={this.state.reservation}
                    
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
                            disabled={endIndex >= this.state.unpays.length}
                            >
                            <IoArrowForward />
                            </button>
                        </div>

            </div>
        )
    }
}

export default Pay;