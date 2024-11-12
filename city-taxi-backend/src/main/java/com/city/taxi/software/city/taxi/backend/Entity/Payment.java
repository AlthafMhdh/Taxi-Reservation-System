package com.city.taxi.software.city.taxi.backend.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "payment")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "payment_seq_generator")
    @SequenceGenerator(name = "payment_seq_generator", sequenceName = "payment_sequence", initialValue = 1)
    @Column(name = "payment_Id", length = 20,nullable = false)
    private int paymentId;

    @Column(name = "amount", length = 16,nullable = false)
    private double amount;

    @Column(name = "pay_date", length = 20)
    private Date payDate;

    @Column(name = "active_state",columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reservation_id")
    private Reservation reservations;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "booking_id")
    private Booking bookings;

    public Payment(double amount) {
        this.amount = amount;
    }
}
