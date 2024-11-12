import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

class NewOperator extends Component{

    initialState = {
        name:"",
        number:"",
        nic:"",
        email:"",
        
    
        errors:{
          name:"",
          number:"",
          nic:"",
          email:"",
            
        }
    }
    
    state = this.initialState;
    
    
    handleChange =(event)=>{
        const {name,value} =event.target;
        this.setState({[name]:value});
    };
    
    validateform = async()=>{
        const {name, nic, email, number}=this.state;
        const errors = {};
    
        //Form Validation methods
        if (!name) {
            errors.name="Name Required.";
        }
    
        if (!nic) {
            errors.nic="NIC Required.";
        }

        if (!email) {
            errors.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Invalid email format. Please enter a valid email address.";
        }
        else {
          // Check email availability
          try {
            const response = await axios.get(`http://localhost:8082/api/v1/operator/checkEmailAvailability?email=${email}`);
            if (response.data === "Email already exists") {
              errors.email = "Email already exists. Please use a different email address.";
            }
          } catch (error) {
            console.error('Error checking email availability:', error);
          }
      }

        if (!number) {
            errors.number="Phone number Required.";
        }
    
        // Check if there are any errors
        const isValid = Object.values(errors).every((error) => error === "");
    
        this.setState({ errors });
        return isValid;
    
      }
    
      handleSubmit = (operator) => {
        console.log("New Operator form submitted:", operator);
      };
    
    
      submitform = async ()=>{
    
        const isValid = await this.validateform();
        if (isValid) {
    
            const OperatorData = {
                operatorName: this.state.name,
                nic: this.state.nic,
                email: this.state.email,
                phoneNumber: this.state.number,            
            };
        
            axios.post('http://localhost:8082/api/v1/operator/save', OperatorData)
                .then(response => {
                    console.log('Operator added successfully');
                  // alert(response.data);
                  alert("Operator Registered Successfully.");
                })
                .catch(error => {
                    console.error('Failed to add operator', error);
                    alert("Failed to add operator");
                })
                .finally(() => {
                    this.setState(this.initialState);
                });
        }    
      };
    
    
      
      render(){
        const { errors } = this.state;
        return (
          <div>
    
            <section className="formheader">
                <h4 style={{paddingLeft:"50px"}}> Add New Operator</h4>
            </section>
                          
            <div className="pagetable">
    
              <div className="clk">
                <div className="button-return">
                  <Link className="btn btn-success " to="/admin/dashboard" ><IoArrowBack /> Back</Link>                                
                </div>                            
              </div>
    
              <div>
                <form className="pageform" handleSubmit={this.handleSubmit}>
                  <div class="row">
                    <div className="col-md-2">

                    </div>
    
                    <div class="col-md-5">
    
                        <label htmlFor="name">Operator Name</label>
                      
                        <input type="text" name="name" id="name" required value={this.state.name} onChange={this.handleChange}/>
                                   
                        <div className="error-message">{errors.name}</div>
    
    
                        <label htmlFor="Pickup">NIC</label>
                      
                        <input type="text" name="nic" id="nic" required value={this.state.nic} onChange={this.handleChange}/>
                                       
                        <div className="error-message">{errors.nic}</div>
                                              
                        <label htmlFor="Dropping" style={{paddingTop:"6px"}}>Email</label>
                      
                        <input type="email" name="email" id="email" required value={this.state.email} onChange={this.handleChange}/>
                                       
                        <div className="error-message">{errors.email}</div>

                        <label htmlFor="number" style={{paddingTop:"6px"}}>Phone Number</label>
                  
                        <input type="text" name="number" id="number" required value={this.state.number} onChange={this.handleChange}/>
                                   
                        <div className="error-message">{errors.number}</div>
                        
                        <br/>
                      <input type="button" className='btn btn-success' value="Add Operator" onClick={this.submitform} />
                    </div>
                    
    
                  </div>
                </form>   
    
              </div>
            </div>
            
          </div>
        );
      };

}

export default NewOperator;