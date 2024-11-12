package com.city.taxi.software.city.taxi.backend.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "driver")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "driver_seq_generator")
    @SequenceGenerator(name = "driver_seq_generator", sequenceName = "driver_sequence", initialValue = 1)
    @Column(name = "driver_Id", length = 20,nullable = false)
    private int driverId;

    @Column(name = "driver_Name", length = 100,nullable = false)
    private String driverName;

    @Column(name = "nic", length = 12,nullable = false)
    private String nic;

    @Column(name = "email", length = 30,nullable = false)
    private String email;

    @Column(name = "phonenumber", length = 10,nullable = false)
    private String phoneNumber;

    @Column(name = "vehiclemodel", length = 20)
    private String vehicleModel;

    @Column(name = "vehiclenumber", length = 10,nullable = false)
    private String vehicleNumber;

    @Column(name = "seat_capacity", length = 3)
    private int capacity;

    @Column(name = "register_date", columnDefinition = "DATETIME")
    private Date registrationDate;

    @Column(name = "active_state",columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @OneToMany(mappedBy="drivers")
    private Set<Reservation> reservation;

    @OneToMany(mappedBy="driver")
    private Set<Rating> ratings;

    @OneToMany(mappedBy="driver")
    private Set<DriverAvailable> driverAvailable;

    @OneToMany(mappedBy="driver")
    private Set<Booking> bookings;

}
