package com.city.taxi.software.city.taxi.backend.Controller;

import com.city.taxi.software.city.taxi.backend.DTO.request.LoginRequest;
import com.city.taxi.software.city.taxi.backend.DTO.request.PassengerSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.PassengerResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Passenger;
import com.city.taxi.software.city.taxi.backend.Service.PassengerService;
import com.city.taxi.software.city.taxi.backend.util.EmailService;
import com.city.taxi.software.city.taxi.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/passenger")
public class PassengerController {

    @Autowired
    private PassengerService passengerService;

    @Autowired
    private EmailService emailService;

    @PostMapping(path = "/save")
    public ResponseEntity<StandardResponse> savePassenger(@RequestBody PassengerSaveDTO passengerSaveDTO){
        String message =passengerService.savePassenger(passengerSaveDTO);

        // Generate and send email
        emailService.sendRegistrationEmail(passengerSaveDTO.getEmail(), passengerSaveDTO.getPassengerName(),passengerSaveDTO.getNic());

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",message),
                HttpStatus.CREATED
               );
    }

    @GetMapping(
            path = "/get-all-passengers"

    )
    public ResponseEntity<StandardResponse> getAllPassengers(){

        List<PassengerResponseDTO> allpassengers = passengerService.getAllPassengers();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",allpassengers),
                HttpStatus.OK
        );

    }

    @PutMapping(path = "/update")
    public ResponseEntity<StandardResponse> updatePassenger(@RequestBody PassengerSaveDTO passengerSaveDTO){
        String message = passengerService.updatePassenger(passengerSaveDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping("/count")
    public ResponseEntity<StandardResponse> PassengerCount(){
        Long message = passengerService.passengerCount();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/delete/{Id}")
    public ResponseEntity<StandardResponse> deletePassenger(@PathVariable(value="Id") int passengerId){
        String message = passengerService.deletePassenger(passengerId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/profile/{Id}")
    public ResponseEntity<StandardResponse> profile(@PathVariable(value = "Id") int passengerId){

        List<PassengerResponseDTO> passenger = passengerService.PassengerProfile(passengerId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",passenger),
                HttpStatus.OK
        );
    }

    //working
    @GetMapping("/checkEmailAvailability")
    public ResponseEntity<String> checkEmailAvailability(@RequestParam String email) {
        if (passengerService.isEmailAvailable(email)) {
            return ResponseEntity.ok("Email already exists");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is available");
        }
    }


    @GetMapping(
            path = "/get-all-passengers-by-activestatus/{status}"
    )
    public ResponseEntity<StandardResponse> getAllPassengersByActiveState(@PathVariable(value = "status") boolean activestate){

        List<PassengerResponseDTO> allpassengers = passengerService.getAllPassengersByActiveState(activestate);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",allpassengers),
                HttpStatus.OK
        );

    }

    //loginchecking and return passengerId
    @PostMapping("/logvalid")
    public ResponseEntity<StandardResponse> loginvalid(@RequestBody LoginRequest loginRequest){
        try{
            Passenger passenger = passengerService.loginCheck(loginRequest.getEmail(), loginRequest.getNic());

            if (passenger != null) {
                int message = passenger.getPassengerId();
               // String message = String.valueOf(passenger.getPassengerId());
                return new ResponseEntity<>(new StandardResponse(200, "Success", message), HttpStatus.OK);
            }  else
            {
                // Return an error response for invalid credentials
                return new ResponseEntity<>(new StandardResponse(401, "Unauthorized", "Invalid login credentials"), HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            return new ResponseEntity<>(new StandardResponse(500, "Internal Server Error", "Error during login. Please try again."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
