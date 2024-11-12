import React, { useState } from 'react';
import Modal from 'react-modal';

function Reserve() {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };



    return(
        <div>
            <br/>
            <div style={{marginTop:"25px"}}>
                <h3>Reservation Information</h3>
            </div>
            <div style={{marginTop:"10px"}}>
                <div>
                    Passenger Name :
                </div>
                <div style={{marginTop:"10px"}}>
                    PickUp :
                </div>
                <div style={{marginTop:"10px"}}>
                    Drop :
                </div>
                <div style={{marginTop:"10px"}}>
                    Distance :
                </div>

                <div style={{marginTop:"20px"}}>
                    <button>Start Ride</button>

                    <button>End Ride</button>
                </div>
                
        <div style={{ marginTop: '20px' }}>
        <button onClick={openModal}>Open Reservation</button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <div>
            {/* Display your reservation information inside the modal */}
            <h3>Reservation Information</h3>
            {/* Add the rest of your reservation information here */}
          </div>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div> 
                

            </div>

        </div>
    )
}

export default Reserve;
