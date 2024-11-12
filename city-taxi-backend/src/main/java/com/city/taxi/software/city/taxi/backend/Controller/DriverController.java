package com.city.taxi.software.city.taxi.backend.Controller;

import com.city.taxi.software.city.taxi.backend.DTO.request.DriverSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.LoginRequest;
import com.city.taxi.software.city.taxi.backend.DTO.response.DriverResDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.DriverResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Driver;
import com.city.taxi.software.city.taxi.backend.Service.DriverService;
import com.city.taxi.software.city.taxi.backend.util.EmailServiceDvr;
import com.city.taxi.software.city.taxi.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @Autowired
    private EmailServiceDvr emailServiceDvr;


    @PostMapping(path = "/save")
    public ResponseEntity<StandardResponse> saveDriver(@RequestBody DriverSaveDTO driverSaveDTO){
        String message =driverService.saveDriver(driverSaveDTO);

        // send email
        emailServiceDvr.sendRegistrationEmail(driverSaveDTO.getEmail(),driverSaveDTO.getDriverName(),driverSaveDTO.getNic());

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",message),
                HttpStatus.CREATED
        );
    }

    @GetMapping(
            path = "/get-all-drivers"
    )
    public ResponseEntity<StandardResponse> getAllDrivers(){

        List<DriverResponseDTO> alldrivers = driverService.getAllDrivers();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",alldrivers),
                HttpStatus.OK
        );
    }

    @GetMapping(
            path = "/get-all-drivers-admin"
    )
    public ResponseEntity<StandardResponse> getAllDriversAdmin(){

        List<DriverResDTO> alldrivers = driverService.getAllDriversAdmin();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",alldrivers),
                HttpStatus.OK
        );
    }

    @GetMapping("/count")
    public ResponseEntity<StandardResponse> DriverCount(){
        Long message = driverService.driverCount();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/profile/{Id}")
    public ResponseEntity<StandardResponse> profile(@PathVariable(value = "Id") int driverId){

        List<DriverResponseDTO> driver = driverService.DriverProfile(driverId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",driver),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/update")
    public ResponseEntity<StandardResponse> updateDriver(@RequestBody DriverSaveDTO driverSaveDTO){
        String message = driverService.updateDriver(driverSaveDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/delete/{Id}")
    public ResponseEntity<StandardResponse> deleteDriver(@PathVariable(value="Id") int driverId){
        String message = driverService.deleteDriver(driverId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping(
            path = "/get-all-drivers-by-activestatus/{status}"
    )
    public ResponseEntity<StandardResponse> getAllDriversByActiveState(@PathVariable(value = "status") boolean activestate){

        List<DriverResponseDTO> alldrivers = driverService.getAllDriversByActiveState(activestate);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",alldrivers),
                HttpStatus.OK
        );

    }

    @GetMapping(path = "/getdriver/{Id}")
    public Driver getDriverDetails(@PathVariable(value="Id") int driverId) {
        return (Driver) driverService.getDriverById(driverId);
    }

    @GetMapping("/checkEmailAvailability")
    public ResponseEntity<String> checkEmailAvailability(@RequestParam String email) {
        if (driverService.isEmailAvailable(email)) {
            return ResponseEntity.ok("Email already exists");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is available");
        }
    }

    //loginchecking and return passengerId
    @PostMapping("/logvalid")
    public ResponseEntity<StandardResponse> loginvalid(@RequestBody LoginRequest loginRequest){
        try{
            Driver driver = driverService.loginCheck(loginRequest.getEmail(), loginRequest.getNic());

            if (driver != null) {
              //  String token = jwtTokenProvider.createToken(driver.getEmail());
                String message = String.valueOf(driver.getDriverId());
                return new ResponseEntity<>(new StandardResponse(200, "Success", message), HttpStatus.OK);
            } else {
                // Return an error response for invalid credentials
                return new ResponseEntity<>(new StandardResponse(401, "Unauthorized", "Invalid login credentials"), HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(new StandardResponse(500, "Internal Server Error", "Error during login. Please try again."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
