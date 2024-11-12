package com.city.taxi.software.city.taxi.backend.Controller;

import com.city.taxi.software.city.taxi.backend.DTO.request.LoginRequest;
import com.city.taxi.software.city.taxi.backend.DTO.request.OperatorSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.OperatorResponseDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.PassengerResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Operator;
import com.city.taxi.software.city.taxi.backend.Service.OperatorService;
import com.city.taxi.software.city.taxi.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/operator")
public class OperatorController {

    @Autowired
    private OperatorService operatorService;

    @PostMapping(path = "/save")
    public ResponseEntity<StandardResponse> saveOperator(@RequestBody OperatorSaveDTO operatorSaveDTO){
        String message =operatorService.saveOperator(operatorSaveDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",message),
                HttpStatus.CREATED
        );
    }

    @GetMapping(
            path = "/get-all-operators-by-activestatus"
    )
    public ResponseEntity<StandardResponse> getAllOperatorsByActiveState(){

        List<OperatorResponseDTO> alloperators = operatorService.getAllOperatorsByActiveState();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",alloperators),
                HttpStatus.OK
        );

    }

    @GetMapping("/count")
    public ResponseEntity<StandardResponse> OperatorCount(){
        Long message = operatorService.operatorCount();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping(
            path = "/get-all-suspend-operators"
    )
    public ResponseEntity<StandardResponse> getAllSuspendOperators(){

        List<OperatorResponseDTO> alloperators = operatorService.getAllSuspendOperator();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",alloperators),
                HttpStatus.OK
        );

    }

    @GetMapping(path = "/profile/{Id}")
    public ResponseEntity<StandardResponse> profile(@PathVariable(value = "Id") int operatorId){

        List<OperatorResponseDTO> passenger = operatorService.OperatorProfile(operatorId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",passenger),
                HttpStatus.OK
        );
    }

    @GetMapping("/checkEmailAvailability")
    public ResponseEntity<String> checkEmailAvailability(@RequestParam String email) {
        if (operatorService.isEmailAvailable(email)) {
            return ResponseEntity.ok("Email already exists");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is available");
        }
    }

    //loginchecking and return operatorId
    @PostMapping("/logvalid")
    public ResponseEntity<StandardResponse> loginvalid(@RequestBody LoginRequest loginRequest){
        try{
            Operator operator = operatorService.loginCheck(loginRequest.getEmail(), loginRequest.getNic());

            if (operator != null) {
                int message = operator.getOperatorId();
                // String message = String.valueOf(operator.getOperatorId());
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
