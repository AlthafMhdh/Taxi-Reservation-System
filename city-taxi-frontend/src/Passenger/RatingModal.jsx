import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaStar } from 'react-icons/fa';
import axios from "axios";

const RatingModal = ({ isOpen, onClose, reservation }) => {


    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(null);

    const handleRatingChange = (rating) => {
        setUserRating(rating);
      };
    
      const handleMouseOver = (index) => {
        setHoverRating(index);
      };
    
      const handleMouseLeave = () => {
        setHoverRating(null);
      };

      
    
      const handleSubmitRating = () => {
        // Add your logic to submit the rating
        console.log('Submitted Rating:', userRating);
        console.log("Reserve: ",reservation)

        const rateData = {
                reserve: reservation,
                ratingValue: userRating           
            };

        axios.put('http://localhost:8082/api/v1/rating/save', rateData)
                .then(response => {
                    console.log('Rating added successfully');
                  onClose();
                })
                .catch(error => {
                    console.error('Failed to add rating', error);
                    alert("Failed to add rating");
                })
                .finally(() => {
                    setUserRating(0);
                });
      };

  return (
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
          height: '300px',
          width: '500px',
        },
      }}
    >

        <button onClick={onClose} style={{ position: "absolute", top: "10px", right: "10px", border: "none", background: "none", fontSize: "20px", cursor: "pointer" }}>
                &times;
        </button>
      {/* Add your rating modal content here */}
      <h3 style={{ textAlign: 'center', paddingTop:"25px" }}>Rate Driver & Your Journey</h3>

      {/* Star Rating UI */}
      <div style={{marginLeft:'100px', paddingTop:"30px"}}>
        {[...Array(5)].map((star, index) => {
          const starValue = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={starValue}
                style={{ display: 'none'}}
                onClick={() => handleRatingChange(starValue)}
              />
              <FaStar
                size={50}
                color={(hoverRating || userRating) >= starValue ? '#ffc107' : '#e4e5e9'}
                onMouseOver={() => handleMouseOver(starValue)}
                onMouseLeave={handleMouseLeave}
              />
            </label>
          );
        })}
      </div>

        {/* Submit Rating Button */}
        <button
            onClick={handleSubmitRating}
            className='btn btn-success'
            style={{ marginTop: '50px', marginLeft:"170px",padding:"10px" }}
        >
            Submit Rating
        </button>

        {/* Close Modal Button */}
        {/* <button onClick={onClose} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f44336', color: 'white' }}>
            Close Modal
        </button> */}
    </Modal>
  );
};

export default RatingModal;
