package com.city.taxi.software.city.taxi.backend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaymentSaveDTO {

    private int paymentId;
    private double amount;
  //  private Reservation reservations;

}
