package com.city.taxi.software.city.taxi.backend.Service;

import com.city.taxi.software.city.taxi.backend.DTO.request.PaymentSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.PaymentUpdateBookingDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.PaymentUpdateDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Payment;

public interface PaymentService {
    String updatePayment(PaymentSaveDTO paymentSaveDTO);


    Payment createPayment(double amount);

    String updatePaymentAmount(PaymentUpdateDTO paymentUpdateDTO);

    String updateBookingPaymentAmount(PaymentUpdateBookingDTO paymentUpdateBookingDTO);
}
