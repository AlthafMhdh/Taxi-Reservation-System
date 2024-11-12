package com.city.taxi.software.city.taxi.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "passenger")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "passenger_seq_generator")
    @SequenceGenerator(name = "passenger_seq_generator", sequenceName = "passenger_sequence", initialValue = 1)
    @Column(name = "passenger_Id", length = 20, nullable = false)
    private int passengerId;

    @Column(name = "passenger_Name", length = 100, nullable = false)
    private String passengerName;

    @Column(name = "nic", length = 12, nullable = false)
    private String nic;

    @Column(name = "email", length = 30, nullable = false)
    private String email;

    @Column(name = "phonenumber", length = 10, nullable = false)
    private String phoneNumber;

    @Column(name = "register_date", columnDefinition = "DATETIME")
    private Date registrationDate;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @OneToMany(mappedBy = "passengers")
    private Set<Reservation> reservation;

    @OneToMany(mappedBy = "passenger")
    private Set<Rating> rating;
}
