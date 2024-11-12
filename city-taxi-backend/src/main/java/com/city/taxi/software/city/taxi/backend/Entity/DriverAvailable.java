package com.city.taxi.software.city.taxi.backend.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "driverAvailability")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DriverAvailable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "driverAvailability_seq_generator")
    @SequenceGenerator(name = "driverAvailability_seq_generator", sequenceName = "driverAvailability_sequence", initialValue = 1)
    @Column(name = "driver_available_Id", length = 20,nullable = false)
    private int driverAvailableId;

    @ManyToOne
    @JoinColumn(name="driver_id", nullable=false)
    private Driver driver;

    @Column(name = "curentLocation", length = 100,nullable = false)
    private String curentLocation;

    @Column(name = "availability_state",columnDefinition = "TINYINT default 0")
    private boolean activeState;
}
