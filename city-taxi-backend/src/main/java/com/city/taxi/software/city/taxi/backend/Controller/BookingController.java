package com.city.taxi.software.city.taxi.backend.Controller;

import com.city.taxi.software.city.taxi.backend.DTO.request.BookingSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.BookingUpdateDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.BookingNewDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.BookingResDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.BookingResponseDTO;
import com.city.taxi.software.city.taxi.backend.Service.BookingService;
import com.city.taxi.software.city.taxi.backend.Service.DriverService;
import com.city.taxi.software.city.taxi.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private DriverService driverService;


    @PostMapping(path = "/save")
    public ResponseEntity<StandardResponse> saveBooking(@RequestBody BookingSaveDTO bookingSaveDTO){
        String message =bookingService.saveBooking(bookingSaveDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",message),
                HttpStatus.CREATED
        );
    }

    @GetMapping(
            path = "/get-all-bookings"
    )
    public ResponseEntity<StandardResponse> getAllBookings(){

        List<BookingResponseDTO> allbookings = bookingService.getAllBooking();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",allbookings),
                HttpStatus.OK
        );
    }

    //BookingHistory By passenger
    @GetMapping(
            path = "/BookingHistory/{operatorId}"
    )
    public ResponseEntity<StandardResponse> BookingHistory(@PathVariable(value = "operatorId") int operators){

        List<BookingResDTO> Bookings = bookingService.BookingHistory(operators);


        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", Bookings),
                HttpStatus.OK
        );
    }

    @GetMapping(
            path = "/BookingRides/{driverId}"
    )
    public ResponseEntity<StandardResponse> BookingRides(@PathVariable(value = "driverId") int driver){

        List<BookingResDTO> Bookings = bookingService.BookingRides(driver);


        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", Bookings),
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/showBookings")
    public ResponseEntity<StandardResponse> showBookings(){
        List<BookingNewDTO> newbookings = bookingService.showNewBookings();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",newbookings),
                HttpStatus.OK
        );
    }


    @PutMapping(path = "/update")
    public ResponseEntity<StandardResponse> updateBooking(@RequestBody BookingUpdateDTO bookingUpdateDTO) {
        String message = bookingService.updateBooking(bookingUpdateDTO);

//        Driver driver = driverService.getDriverById(bookingUpdateDTO.getDriver());
//
//        if (driver != null) {
//            String driverName = driver.getDriverName();
//            String vehicleNumber = driver.getVehicleNumber();
//
//
//            Booking booking = bookingRepo.getReferenceById(bookingUpdateDTO.getBookingId());
//            if (booking != null) {
//                Date Date = booking.getBookingDate();
//                String pickup = booking.getPickupLocation();
//                String drop = booking.getDroppingLocation();
//                String name = booking.getPassengerName();
//                String number = booking.getPhoneNumber();
//        }
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", message),
                HttpStatus.OK
        );
    }




}
