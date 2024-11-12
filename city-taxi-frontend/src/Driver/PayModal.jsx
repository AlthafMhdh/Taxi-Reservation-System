import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from "axios";
import DoneModal from './DoneModal';

const PayModal = ({ isOpen, onClose, reservationId, amount }) => {

    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    const [inputAmount, setInputAmount] = useState(0);

    useEffect(() => {
        setInputAmount(amount);
    }, [amount]);

    const openDoneModal = () => {
        
       // onClose();
       // setIsDoneModalOpen(true);
       
       reservationId=reservationId
        console.log("Reserve: ",reservationId)
        console.log(reservationId.type)        
        const payData = {
                reservations: reservationId
            };

            axios.put('http://localhost:8082/api/v1/payment/updatePayment', payData)
            .then(response => {
               console.log('Payment updated successfully');
               onClose();
                setIsDoneModalOpen(true);
            })
            .catch(error => {
                console.error('Failed to add payment', error);
                alert("Failed to add payment");
            })
            .finally(() => {
                //
            });
        
    };

    const closeDoneModal = () => {
        setIsDoneModalOpen(false);
    }
     
    const handleAmountChange = (e) => {
        setInputAmount(e.target.value);
    };    

  return (
    <div>
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '55%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '20px',
          height: '350px',
          width: '400px',
        },
      }}
    >
      <button onClick={onClose} style={{ position: "absolute", top: "10px", right: "10px", border: "none", background: "none", fontSize: "20px", cursor: "pointer" }}>
        &times;
      </button>
        
      <h3 style={{ textAlign: 'center', paddingTop:"25px" }}>Add Cash Payment </h3>


      <div style={{marginTop:"30px", display: "flex", alignItems: "center"}}>
            <label style={{width:"150px",padding: "8px",textAlign:"center",borderRadius: "5px",border: "1px solid #ccc",height:"40px"}}><b>LKR</b></label>
            <input type="text" name="amount" readOnly value={inputAmount} onChange={handleAmountChange} 
                style={{ padding: "8px",borderRadius: "5px",border: "1px solid #ccc",fontSize: "16px",textAlign: "right",}}
            />
      </div>

        <button className='btn btn-success' onClick={openDoneModal} style={{ marginTop: '35px', marginLeft:"120px",padding:"10px" }}>
            Add Payment
        </button>

        {/* <button onClick={onClose} className="btn btn-primary" style={{ marginTop: '30px', padding: '10px', marginLeft:"170px", }}>
            Card Payment
        </button> */}
        <div style={{marginTop:"25px"}}>
            <h6>* Cash payment only pay Here.</h6>
            <h6>* Customers only can make card payments.</h6>
        </div>

        
    </Modal>

    {isDoneModalOpen && (
        <DoneModal isOpen={isDoneModalOpen} onClose={closeDoneModal} />
    )}
    
        
    </div>
    
  );
};

export default PayModal;
