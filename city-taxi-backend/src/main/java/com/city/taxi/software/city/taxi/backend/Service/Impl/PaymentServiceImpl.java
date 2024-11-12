package com.city.taxi.software.city.taxi.backend.Service.Impl;

import com.city.taxi.software.city.taxi.backend.DTO.request.PaymentSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.PaymentUpdateBookingDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.PaymentUpdateDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Payment;
import com.city.taxi.software.city.taxi.backend.Repository.PaymentRepo;
import com.city.taxi.software.city.taxi.backend.Repository.ReservationRepo;
import com.city.taxi.software.city.taxi.backend.Service.PaymentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private ReservationRepo reservationRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String updatePayment(PaymentSaveDTO paymentSaveDTO) {
        Payment payment=modelMapper.map(paymentSaveDTO, Payment.class);
        payment.setPayDate(new Date());
        payment.setActiveState(true);

        if (paymentRepo.existsById(payment.getPaymentId())){
            paymentRepo.save(payment);
           return " Payment Added.";

        }
        else{
            throw new DuplicateKeyException("Payment not Added.");
        }
    }

    @Override
    public Payment createPayment(double amount) {
        Payment payment = new Payment();
        payment.setAmount(amount);
        payment.setActiveState(false);

        return paymentRepo.save(payment);
    }

    @Override
    public String updatePaymentAmount(PaymentUpdateDTO paymentUpdateDTO) {

        int paymentId = paymentRepo.Pay(paymentUpdateDTO.getReservations());
      //  return String.valueOf(paymentId);

        Payment existingPayment = paymentRepo.getReferenceById(paymentId);
        existingPayment.setActiveState(true);
        existingPayment.setPayDate(new Date());

        paymentRepo.save(existingPayment);
        return "Payment Added";
   }

    @Override
    public String updateBookingPaymentAmount(PaymentUpdateBookingDTO paymentUpdateBookingDTO) {
        int paymentId = paymentRepo.Pay(paymentUpdateBookingDTO.getBookings());
        //  return String.valueOf(paymentId);

        Payment existingPayment = paymentRepo.getReferenceById(paymentId);
        existingPayment.setActiveState(true);
        existingPayment.setPayDate(new Date());

        paymentRepo.save(existingPayment);
        return "Payment Updated.";
    }


}
