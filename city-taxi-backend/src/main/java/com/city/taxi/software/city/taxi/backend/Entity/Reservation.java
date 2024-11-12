package com.city.taxi.software.city.taxi.backend.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "reservation")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reservation_seq_generator")
    @SequenceGenerator(name = "reservation_seq_generator", sequenceName = "reservation_sequence", initialValue = 1)
    @Column(name = "reservation_Id", length = 20,nullable = false)
    private int reservationId;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "passenger_id", nullable = false)
    private Passenger passengers;

    @ManyToOne
    @JoinColumn(name="driver_id")
    private Driver drivers;

    @Column(name = "pickup_location", length = 100)
    private String pickupLocation;

    @Column(name = "dropping_location", length = 100)
    private String droppingLocation;

    @Column(name = "distance")
    private double distance;

    @Column(name = "reservation_date", columnDefinition = "DATETIME")
    private Date reservationDate;

    @Column(name = "active_state",columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @OneToOne(mappedBy = "reservations")
    private Payment payment;

    @OneToOne(mappedBy = "reserve")
    private Rating rating;


    public Reservation(Passenger passengers, String pickupLocation, String droppingLocation, double distance) {
        this.passengers = passengers;
        this.pickupLocation = pickupLocation;
        this.droppingLocation = droppingLocation;
        this.distance = distance;
    }

    public Reservation(int reservationId, Passenger passengers, Driver drivers, String pickupLocation, String droppingLocation, double distance) {
        this.reservationId = reservationId;
        this.passengers = passengers;
        this.drivers = drivers;
        this.pickupLocation = pickupLocation;
        this.droppingLocation = droppingLocation;
        this.distance = distance;
    }

    public Reservation(int reservationId, Passenger passengers, Driver drivers, String pickupLocation, String droppingLocation, double distance, Date reservationDate, Payment payment) {
        this.reservationId = reservationId;
        this.passengers = passengers;
        this.drivers = drivers;
        this.pickupLocation = pickupLocation;
        this.droppingLocation = droppingLocation;
        this.distance = distance;
        this.reservationDate = reservationDate;
        this.payment = payment;
    }


    public Reservation orElse(Object o) {
        return null;
    }
}
