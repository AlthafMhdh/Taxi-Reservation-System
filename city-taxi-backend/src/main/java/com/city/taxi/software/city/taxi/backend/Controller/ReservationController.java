package com.city.taxi.software.city.taxi.backend.Controller;

import com.city.taxi.software.city.taxi.backend.DTO.request.NewReservationDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.ReservationUpdateDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.*;
import com.city.taxi.software.city.taxi.backend.Entity.Driver;
import com.city.taxi.software.city.taxi.backend.Entity.Passenger;
import com.city.taxi.software.city.taxi.backend.Entity.Reservation;
import com.city.taxi.software.city.taxi.backend.Repository.PassengerRepo;
import com.city.taxi.software.city.taxi.backend.Service.DriverService;
import com.city.taxi.software.city.taxi.backend.Service.PassengerService;
import com.city.taxi.software.city.taxi.backend.Service.ReservationService;
import com.city.taxi.software.city.taxi.backend.util.SMSServiceReserve;
import com.city.taxi.software.city.taxi.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private SMSServiceReserve smsServiceReserve;

    @Autowired
    private DriverService driverService;

    @Autowired
    private PassengerService passengerService;

    @Autowired
    private PassengerRepo passengerRepo;


    @PostMapping(path = "/new")
    public ResponseEntity<StandardResponse> newReservation(@RequestBody NewReservationDTO newReservationDTO){

        String message =reservationService.newReservation(newReservationDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",message),
                HttpStatus.CREATED
        );
    }

    @GetMapping(path = "/showRide")
    public ResponseEntity<StandardResponse> showRides(){
        List<ReservationResponseDTO> newrides = reservationService.showNewRides();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",newrides),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/update")
    public ResponseEntity<StandardResponse> updateReservation(@RequestBody ReservationUpdateDTO reservationUpdateDTO) {
        String message = reservationService.updateReservation(reservationUpdateDTO);

        Driver driver = driverService.getDriverById(reservationUpdateDTO.getDrivers());

        if (driver != null) {
            String driverName = driver.getDriverName();
            String vehicleNumber = driver.getVehicleNumber();


        Reservation reservation = reservationService.getReservationById(reservationUpdateDTO.getReservationId());
        if (reservation != null) {
            Date reservationDate = reservation.getReservationDate();
            String pickup = reservation.getPickupLocation();
            String drop = reservation.getDroppingLocation();
            Passenger passenger = reservation.getPassengers();

            if (passenger != null) {
//                smsServiceReserve.sendReservationConfirmation(
//                        passenger.getPhoneNumber(),
//                        driverName,
//                        vehicleNumber,
//                        reservationDate,
//                        pickup,
//                        drop
//                );
            }
        }
            //Send SMS
         //   smsServiceReserve.sendReservationConfirmation(passenger.getPhoneNumber(), driver.getDriverName(), driver.getVehicleNumber(), reservation.getReservationDate(), reservation.getPickupLocation(), reservation.getDroppingLocation());
        }
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", message),
                HttpStatus.OK
        );
    }

    //Ride History by driverId
    @GetMapping(
            path = "/RideHistory/{driverId}"
    )
    public ResponseEntity<StandardResponse> RideHistory(@PathVariable(value = "driverId") int drivers){

        List<RideHistoryDTO> Rides = reservationService.RideHistory(drivers);


        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", Rides),
                HttpStatus.OK
        );
    }
    //ReservationHistory By passenger
    @GetMapping(
            path = "/ReservationHistory/{passengerId}"
    )
    public ResponseEntity<StandardResponse> ReservationHistory(@PathVariable(value = "passengerId") int passengers){

        List<ReservationHistoryDTO> Reservations = reservationService.ReservationHistory(passengers);


        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", Reservations),
                HttpStatus.OK
        );
    }
    //Passenger reservation count
    @GetMapping("/reservationcount/{passengerId}")
    public ResponseEntity<StandardResponse> PassengerReservationCount(@PathVariable(value = "passengerId") int passengerId){
        Long message = reservationService.passengerReservationCount(passengerId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    //Driver reservation count
    @GetMapping("/ridecount/{driverId}")
    public ResponseEntity<StandardResponse> DriverRideCount(@PathVariable(value = "driverId") int driverId){
        Long message = reservationService.driverRideCount(driverId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    //AllCompleted Reservation for Admin
    @GetMapping(path = "/AllReservation")
    public ResponseEntity<StandardResponse> AllReservation(){
        List<ReservationDetailsDTO> AllReservation = reservationService.AllReservation();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", AllReservation),
                HttpStatus.OK
        );
    }

    //ReservationHistory By passenger
    @GetMapping(
            path = "/Unpay/{passengerId}"
    )
    public ResponseEntity<StandardResponse> Unpay(@PathVariable(value = "passengerId") int passengers){

        List<UnpayDTO> Unpays = reservationService.Unpay(passengers);


        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", Unpays),
                HttpStatus.OK
        );
    }

    @GetMapping(
            path = "/pending/{passengerId}"
    )
    public ResponseEntity<StandardResponse> Pending(@PathVariable(value = "passengerId") int passengers){

        List<PendingDTO> Pendings = reservationService.Pending(passengers);


        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", Pendings),
                HttpStatus.OK
        );
    }


//For Admin
    @GetMapping(
            path = "/get-cancel-reservation"
    )
    public ResponseEntity<StandardResponse> cancelReservationOfAll(){

        List<ReservationResponseDTO> allcancelreservation = reservationService.getAllCancelReservtion();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",allcancelreservation),
                HttpStatus.OK
        );

    }

  //User cancel Reservation
  @GetMapping(
          path = "/cancel-reservation/{Id}"
  )
  public ResponseEntity<StandardResponse> cancelReservationByUser(@PathVariable(value="Id") int passengers){

      List<ReservationResponseDTO> cancelreservation = reservationService.getCancelReservtionById(passengers);
      return new ResponseEntity<StandardResponse>(
              new StandardResponse(200,"Success",cancelreservation),
              HttpStatus.OK
      );

  }

    //User Reservation By id
    @GetMapping(
            path = "/all-reservation/{Id}"
    )
    public ResponseEntity<StandardResponse> allReservationByUser(@PathVariable(value="Id") int passengers){

        List<ReservationResponseDTO> reservationsbyid = reservationService.vieAllReservtionById(passengers);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",reservationsbyid),
                HttpStatus.OK
        );

    }

    //For Admin
    @GetMapping(
            path = "/all-reservation"
    )
    public ResponseEntity<StandardResponse> viewAllReservation(){

        List<ReservationResponseDTO> viewallreservation = reservationService.viewAllReservtion();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",viewallreservation),
                HttpStatus.OK
        );

    }

    //Driver
    @GetMapping(
            path = "/all-reservationbyfalse"
    )
    public ResponseEntity<StandardResponse> viewAllReservationbyfalse(){

        List<ReservationResponseDTO> viewallreservations = reservationService.viewAllReservtionbyfalse();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",viewallreservations),
                HttpStatus.OK
        );

    }


}
