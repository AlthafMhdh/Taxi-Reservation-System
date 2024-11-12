import React, { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import PayModal from './PayModal';
import {
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsService,
    DirectionsRenderer,
    LoadScript,
  } from '@react-google-maps/api';
  
  const libraries = ['places'];
  const googleMapsApiKey = 'AIzaSyAF6DmICYAwskmjHJVMC_2LzCSnsgnogwg';



const RideModal = ({ isOpen, onClose, reservationId, pickup, drop, amount }) => {

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
          setOrigin(pickup); // Set origin coordinates
          setDestination(drop); // Set destination coordinates
          console.log('Reservation Id: ', reservationId);
          console.log('Origin:', pickup);
          console.log('Destination:', drop);
          // Ensure that the modal is open before calculating directions
          calculateDirections();
        }
      }, [isOpen, pickup, drop, reservationId]);

    const calculateDirections = () => {
        if (origin && destination) {
          const directionsService = new window.google.maps.DirectionsService();
    
          directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
              if (status === 'OK') {
                // Clear previous directions
                setDirectionsResponse(null);
                // Set new directions response
                setDirectionsResponse(response);
              } else {
                console.error(`Directions request failed due to ${status}`);
              }
            }
          );
        }
      };
    
    
      const handleAutocomplete = (value, type) => {
        // Update origin or destination based on the type
        if (type === 'origin') {
          setOrigin(value);
        } else if (type === 'destination') {
          setDestination(value);
        }
      };

    const openPayModal = () => {
        setDirectionsResponse(null);
        setIsPayModalOpen(true);
        onClose();
        reservationId=reservationId
        amount={amount}
        console.log("Rese Id :",reservationId)
        console.log(reservationId.type)
       
        
    };

    const closePayModal = () => {
        setDirectionsResponse(null);
        setIsPayModalOpen(false);
        
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
                        height:'400px',
                        width:'600px'
                    },
                }}
            >               
                <h5 style={{textAlign:"center"}}>Reservation Information</h5>

                <div style={{width:"500px", height:"260px", marginLeft:"30px", border:"1px solid black"}}>

                <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries} onLoad={calculateDirections}>
            <GoogleMap
              id="map"
              mapContainerStyle={{ width: '100%', height: '100%' }}
              zoom={10}
              center={{ lat: 7.4839, lng: 80.3683 }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {directionsResponse && (
                <DirectionsRenderer
                  directions={directionsResponse}
                  options={{
                    polylineOptions: {
                      strokeColor: 'blue',
                    },
                  }}
                />
              )}

              {origin && <Marker position={{ lat: origin.lat, lng: origin.lng }} label={`Pickup (${origin.lat}, ${origin.lng})`} />}
              {destination && <Marker position={{ lat: destination.lat, lng: destination.lng }} label={`Drop (${destination.lat}, ${destination.lng})`} />}
            </GoogleMap>
          </LoadScript>

                </div>

                <div style={{paddingTop:"25px",marginLeft:"200px"}}>
                    <button className='btn btn-danger' style={{width:"150px"}} onClick={openPayModal}> End Ride </button>                    
                </div> 
                
                
            </Modal>

        <PayModal isOpen={isPayModalOpen} onClose={closePayModal} reservationId={reservationId} amount={amount} />
            
        </div>
    );
};

export default RideModal;
