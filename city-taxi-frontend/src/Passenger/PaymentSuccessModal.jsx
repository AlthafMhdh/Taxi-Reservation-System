import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import RatingModal from './RatingModal';


const PaymentSuccessModal = ({ isOpen, onClose, reservation }) => {
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    const openRatingModal = () => {
        setIsRatingModalOpen(true);
        onClose();
        reservation={reservation}
        console.log("Rese Id :",reservation)
       
        
    };

    const closeRatingModal = () => {
        setIsRatingModalOpen(false);
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
                        borderRadius:'20px',
                        height:'350px',
                        width:'500px'
                    },
                }}
            >
                <div className='modals'>      
                    
                </div>
                <h3 style={{textAlign:"center"}}>Transaction Completed Successfully</h3>
                
                <h5 style={{textAlign:"center"}}>Thankyou for your payment.</h5>

                <div style={{paddingTop:"25px", display:"inline-flex"}}>
                    <button className='btn btn-primary' style={{width:"250px"}} onClick={openRatingModal}>Rate Driver & Your Journey </button>
                    <div style={{paddingLeft:"100px"}}>
                        <button className='btn btn-danger' style={{width:"100px"}} onClick={onClose}> Later </button>
                    </div>
                </div> 
                
                
            </Modal>

            {isRatingModalOpen && (
            <RatingModal isOpen={isRatingModalOpen} onClose={closeRatingModal} reservation={reservation} />
            )}
            


        </div>
    );
};

export default PaymentSuccessModal;
