package com.city.taxi.software.city.taxi.backend.Controller;

import com.city.taxi.software.city.taxi.backend.DTO.request.PaymentSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.PaymentUpdateBookingDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.PaymentUpdateDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Payment;
import com.city.taxi.software.city.taxi.backend.Service.PaymentService;
import com.city.taxi.software.city.taxi.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PutMapping(path = "/update")
    public ResponseEntity<StandardResponse> updatePayment(@RequestBody PaymentSaveDTO paymentSaveDTO){
        String message = paymentService.updatePayment(paymentSaveDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @PostMapping(path = "/create")
    public ResponseEntity<StandardResponse> createPayment(@RequestBody Payment payment){
        Payment createdPayment =paymentService.createPayment(payment.getAmount());

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",createdPayment),
                HttpStatus.CREATED
        );
    }

    @PutMapping(path = "/updatePayment")
    public ResponseEntity<StandardResponse> updatePaymentAmount(@RequestBody PaymentUpdateDTO paymentUpdateDTO){
        String message = paymentService.updatePaymentAmount(paymentUpdateDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/updateBookingPayment")
    public ResponseEntity<StandardResponse> updateBookingPaymentAmount(@RequestBody PaymentUpdateBookingDTO paymentUpdateBookingDTO){
        String message = paymentService.updateBookingPaymentAmount(paymentUpdateBookingDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }


}
