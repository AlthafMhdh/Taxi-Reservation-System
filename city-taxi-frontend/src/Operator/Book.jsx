import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
  LoadScript,
} from '@react-google-maps/api';

const libraries = ['places'];
const googleMapsApiKey = 'AIzaSyAF6DmICYAwskmjHJVMC_2LzCSnsgnogwg'; // Replace with your actual API key

const Book = () => {
  
    // Add these state variables
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [selectedPickup, setSelectedPickup] = useState('');
    const [selectedDropping, setSelectedDropping] = useState('');
    const autocompletePickupRef = useRef(null);
    const autocompleteDroppingRef = useRef(null);
    const [charge, setCharge] = useState('');


  const initialState = {
    name: '',
    number: '',
    Pickup: '',
    Dropping: '',
    errors: {
      name: '',
      number: '',
      Pickup: '',
      Dropping: '',
    },
    
  };

  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleClear = () => {
    setState({
      ...state,
      Pickup: '',
      Dropping: '',
    });
    setDistance('');
    setDuration('');
    setCharge('');
    setDirectionsResponse(null);

  };

  const validateform = () => {
    const { Pickup, Dropping } = state;
    const errors = {};

    // Form Validation methods
    if (!Pickup) {
      errors.Pickup = 'Location Required.';
    }

    if (!Dropping) {
      errors.Dropping = 'Location Required.';
    }

    // Check if there are any errors
    const isValid = Object.values(errors).every((error) => error === '');

    setState({ ...state, errors });
    return isValid;
  };


  const handleAutocompleteChange = (name, value) => {
    setState({ ...state, [name]: value });
    // Update selected location in the state
    if (name === 'Pickup') {
      setSelectedPickup(value);
    } else if (name === 'Dropping') {
      setSelectedDropping(value);
    }
  };

  const handleAutocompletePlaceChanged = (name) => {
    const autocompleteRef = name === 'Pickup' ? autocompletePickupRef : autocompleteDroppingRef;
    const place = autocompleteRef.current.getPlace();

    if (place && place.formatted_address) {
      const formattedAddress = place.formatted_address;
      setState({ ...state, [name]: formattedAddress });
      handleAutocompleteChange(name, formattedAddress);
    } else {
      console.error(`Error: Place or formatted_address is undefined for ${name}`);
    }
  };
  

  const Routesubmitform = () => {
    const isValid = validateform();
    if (isValid) {
      const origin = state.Pickup;
      const destination = state.Dropping;
  
      const directionsService = new window.google.maps.DirectionsService();
  
      directionsService.route(
        {
          origin,
          destination,
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            setDirectionsResponse(response);
            const route = response.routes[0];
            const leg = route.legs[0];
  
            setDistance(leg.distance.text);
            setDuration(leg.duration.text);

                // Calculate charge based on distance
            const distanceInKm = leg.distance.value / 1000;
            const firstKmCharge = 120;
            const additionalKmCharge = 80 * Math.max(0, distanceInKm - 1);
            const totalCharge = firstKmCharge + additionalKmCharge;

            setCharge("Rs "+totalCharge.toFixed(2));

          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  };


  

  const submitform = () => {
    const isValid = validateform();
    if (isValid) {
      const reservationData = {
        operator: '',
        phoneNumber: '',
        passengerName: '',
        pickupLocation: state.Pickup,
        droppingLocation: state.Dropping,
        payment: '',
        distance: '',
      };

      axios
        .post('http://localhost:8082/api/v1/reservation/save', reservationData)
        .then((response) => {
          console.log('Reservation added successfully');
          // Optionally handle success (e.g., show a success message)
          // alert("Patient added successfully");
          alert(response.data);

            // Clear Google Map, distance, duration, and charge after successful reservation
            setDirectionsResponse(null);
            setDistance('');
            setDuration('');
            setCharge('');

        })
        .catch((error) => {
          console.error('Failed to reserve', error);
          // Optionally handle failure (e.g., show an error message)
          alert('Failed to reserve');
        })
        .finally(() => {
          setState(initialState);
        });
    }
  };

  return (
    <div>
      <section className="formheader">
        <h4 style={{ paddingLeft: '50px' }}> Booking</h4>
      </section>

      <div className="pagetable">
        <div className="clk">
          <div className="button-return">
            <Link className="btn btn-success " to="/operator/dashboard">
              <IoArrowBack /> Back
            </Link>
          </div>
        </div>

        <div>
          <form className="pageform">
            <div className="row">
              <div className="col-md-5">
                <label htmlFor="name">Passenger Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={state.name}
                  onChange={handleChange}
                />
                <div className="error-message">{state.errors.name}</div>

                <label htmlFor="number" style={{ paddingTop: '6px' }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  required
                  value={state.number}
                  onChange={handleChange}
                />
                <div className="error-message">{state.errors.number}</div>

                <label htmlFor="Pickup">Pickup Location</label>
                <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
                  <Autocomplete
                    onLoad={(autocomplete) => (autocompletePickupRef.current = autocomplete)}
                    onPlaceChanged={() => handleAutocompletePlaceChanged('Pickup')}
                  >
                    <input
                      type="text"
                      name="Pickup"
                      id="Pickup"
                      required
                      value={state.Pickup}
                      onChange={handleChange}
                    />
                  </Autocomplete>
                </LoadScript>

                <div className="error-message">{state.errors.Pickup}</div>

                <label htmlFor="Dropping" style={{ paddingTop: '6px' }}>
                  Dropping Location
                </label>
                <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
                  <Autocomplete
                    onLoad={(autocomplete) => (autocompleteDroppingRef.current = autocomplete)}
                    onPlaceChanged={() => handleAutocompletePlaceChanged('Dropping')}
                  >
                    <input
                      type="text"
                      name="dropping"
                      id="dropping"
                      required
                      value={state.Dropping}
                      onChange={handleChange}
                    />
                  </Autocomplete>
                </LoadScript>

                <div className="error-message">{state.errors.Dropping}</div>

                <br />
                <input
                  type="button"
                  className="btn btn-success"
                  value="Reservation"
                  onClick={submitform}
                />
              </div>

              <div className="col-md-6">
                <div className="R-box" style={{ width: '', height: '250px' }}>
                  <LoadScript
                    googleMapsApiKey={googleMapsApiKey}
                    libraries={libraries}
                    onLoad={(map) => console.log('Google Maps API loaded', map)}
                  >
                    
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

                        <Marker position={{ lat: 7.48390000, lng: 80.36830000 }} />
                    </GoogleMap>

                  </LoadScript>
                </div>

                <br />

                <div style={{ display: 'inline-flex' }}>
                  <div style={{ paddingLeft: '200px', paddingTop: '0px' }}>
                    <button className="btn btn-primary" onClick={Routesubmitform}>
                      Calculate Route
                    </button>
                  </div>
                  <div style={{ paddingLeft: '30px', paddingTop: '0px' }}>
                    <button className="btn btn-danger" onClick={handleClear}>
                      Reset
                    </button>
                  </div>
                </div>

                <div style={{ paddingLeft: '80px' }}>
                  <div style={{ paddingTop: '10px' }}>Distance : {distance}</div>
                  <div style={{ paddingTop: '15px' }}>Duration : {duration}</div>
                  <div style={{ paddingTop: '15px' }}>Charge : {charge} </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book;
