import React, { Component, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { GoogleMap, Autocomplete, DirectionsRenderer, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const googleMapsApiKey = "AIzaSyAF6DmICYAwskmjHJVMC_2LzCSnsgnogwg";
const libraries = ['places'];

const Reservations =() =>{

  const id = window.sessionStorage.getItem('id');
  const passengerId = id;
  console.log("Id: ",passengerId)
  

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedPickup, setSelectedPickup] = useState('');
  const [selectedDropping, setSelectedDropping] = useState('');
  const autocompletePickupRef = useRef(null);
  const autocompleteDroppingRef = useRef(null);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [Tdistance, setTDistance] = useState('');

  const initialState = {
    Pickup: '',
    Dropping: '',
    distance: '',
    duration: '',
    charge: '',
    errors: {
      Pickup: '',
      Dropping: '',
      distance:'',
      duration:'',
      charge:'',
    },
  };
  const [state, setState] = useState(initialState);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  
  const validateform = () => {
    const { Pickup, Dropping } = state;
    const errors = {};

    // Form Validation methods
    if (!Pickup) {
      errors.Pickup = 'Pickup Location Required.';
    }

    if (!Dropping) {
      errors.Dropping = 'Drop Location Required.';
    }

    // Check if there are any errors
    const isValid = Object.values(errors).every((error) => error === '');

    setState({ ...state, errors });
    return isValid;
  };

  const validateform2 = () => {
    const { Pickup, Dropping,distance,charge } = state;
    const errors = {};

    // Form Validation methods
    if (!Pickup) {
      errors.Pickup = 'Pickup Location Required.';
    }

    if (!Dropping) {
      errors.Dropping = 'Drop Location Required.';
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
  
            if (leg && leg.distance && leg.distance.text) {

              const distanceValue = leg.distance.value / 1000;
              const distanceText = leg.distance.text;
              setDistance(distanceText);
              setTDistance(distanceValue.toFixed(2));
            } else {
              console.error('Distance information not available');
              setDistance('N/A');
            }

            if (leg && leg.duration && leg.duration.text) {
              setDuration(leg.duration.text);
            } else {
              console.error('Duration information not available');
              setDuration('N/A');
            }

                // Calculate charge based on distance
            const distanceInKm = leg.distance.value / 1000;
            const firstKmCharge = 120;
            const additionalKmCharge = 80 * Math.max(0, distanceInKm - 1);
            const totalCharge = firstKmCharge + additionalKmCharge;

            const RCharges = ("Rs "+totalCharge.toFixed(2));
            const Charges = totalCharge.toFixed(2)
            setCharge(RCharges);
            setAmount(Charges);

          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  };

  const submitform = () => {
    const isValid = validateform2();
    if (isValid) {
      const reservationData = {
        passengers: passengerId,
        pickupLocation: state.Pickup,
        droppingLocation: state.Dropping,
        payment: amount,
        distance: Tdistance,
      };

      axios
        .post('http://localhost:8082/api/v1/reservation/new', reservationData)
        .then((response) => {
          console.log('Reservation added successfully');
          // Optionally handle success (e.g., show a success message)
          // alert("Patient added successfully");
          alert(response.data.data);

            // Clear Google Map, distance, duration, and charge after successful reservation
            setDirectionsResponse(null);
            setDistance('');
            setDuration('');
            setCharge('');
            setAmount('');
            setTDistance('');

            console.log(amount);
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
        <h4 style={{ paddingLeft: '50px' }}>Reservation</h4>
      </section>

      <div className="pagetable">
        <div className="clk">
          <div className="button-return">
            <Link className="btn btn-success" to="/passenger/dashboard">
              <IoArrowBack /> Back
            </Link>
          </div>
        </div>

        <div>
          <form className="pageform">
            <div className="row">
              <div className="col-md-5">
                <label htmlFor="Pickup">Pickup Location</label>
                <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}>
                  <Autocomplete
                    onLoad={(autocomplete) => (autocompletePickupRef.current = autocomplete)}
                    onPlaceChanged={() => handleAutocompletePlaceChanged('Pickup')}
                  >
                    <input
                      type="text"
                      name="Pickup"
                      id="Pickup"
                      value={state.Pickup}
                      onChange={handleChange}
                    />
                  </Autocomplete>
                </LoadScript>
                <div className="error-message">{state.errors.Pickup}</div>

                <label htmlFor="Dropping" style={{ paddingTop: '6px' }}>
                  Dropping Location
                </label>
                <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}>
                  <Autocomplete
                    onLoad={(autocomplete) => (autocompleteDroppingRef.current = autocomplete)}
                    onPlaceChanged={() => handleAutocompletePlaceChanged('Dropping')}
                  >
                    <input
                      type="text"
                      name="Dropping"
                      id="Dropping"
                      value={state.Dropping}
                      onChange={handleChange}
                    />
                  </Autocomplete>
                </LoadScript>
                <div className="error-message">{state.errors.Dropping}</div>
                <br />
                <div style={{ marginLeft: '150px' }}>
                  <button className="btn btn-danger" type="button" onClick={Routesubmitform}>
                    Calculate Route
                  </button>
                </div>
                <br />

                <div>
                  Distance : {distance && <span>{distance}</span>}
                </div>
                <div style={{ paddingTop: '10px' }}>
                  Duration : {duration && <span>{duration}</span>}
                </div>
                <div style={{ paddingTop: '10px' }}>
                  Charge : {charge && <span>{charge}</span>} 
                </div>

                <br />

                <input
                  type="button"
                  className="btn btn-success"
                  value="Reservation"
                  onClick={submitform}
                />
              </div>

              <div className="col-md-5">
                <div className="R-box">
                  <LoadScript
                    googleMapsApiKey={googleMapsApiKey}
                    libraries={['places']}
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}
export default Reservations;

