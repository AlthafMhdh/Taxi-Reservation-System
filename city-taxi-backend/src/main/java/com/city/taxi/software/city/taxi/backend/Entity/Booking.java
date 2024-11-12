package com.city.taxi.software.city.taxi.backend.Entity;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "operatorBooking")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "operatorBooking_seq_generator")
    @SequenceGenerator(name = "operatorBooking_seq_generator", sequenceName = "operatorBooking_sequence", initialValue = 1)
   // @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "booking_Id", length = 20,nullable = false)
    private int bookingId;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "operator_id", nullable = false)
    private Operator operator;

    @ManyToOne
    @JoinColumn(name="driver_id")
    private Driver driver;

    @Column(name = "passenger_Name", length = 100,nullable = false)
    private String passengerName;

    @Column(name = "phonenumber", length = 10,nullable = false)
    private String phoneNumber;

    @Column(name = "pickup_location", length = 100)
    private String pickupLocation;

    @Column(name = "dropping_location", length = 100)
    private String droppingLocation;

    @Column(name = "distance")
    private double distance;

    @Column(name = "booking_date", columnDefinition = "DATETIME")
    private Date bookingDate;

    @Column(name = "active_state",columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @OneToOne(mappedBy = "bookings")
    private Payment payment;

    public Booking(Operator operator, String passengerName, String phoneNumber, String pickupLocation, String droppingLocation, double distance) {
        this.operator = operator;
        this.passengerName = passengerName;
        this.phoneNumber = phoneNumber;
        this.pickupLocation = pickupLocation;
        this.droppingLocation = droppingLocation;
        this.distance = distance;
    }


}
