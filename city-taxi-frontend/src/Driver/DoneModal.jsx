import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';


const DoneModal = ({ isOpen, onClose }) => {
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);

    const openDoneModal = () => {
        setIsDoneModalOpen(true);
        onClose();
       
    };

    const closeDoneModal = () => {
        setIsDoneModalOpen(false);
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
                        height:'320px',
                        width:'400px'
                    },
                }}
            >
                <div className='modalss'>      
                    
                </div>
                
                <h5 style={{textAlign:"center"}}>Payment Added Successfully.</h5>

                <div style={{paddingTop:"25px", marginLeft:"100px"}}>
                    <button className='btn btn-success' style={{width:"150px"}} onClick={onClose}> Done </button>
                    
                </div> 
                
                
            </Modal>

        </div>
    );
};

export default DoneModal;
