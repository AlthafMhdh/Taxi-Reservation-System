package com.city.taxi.software.city.taxi.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "operator")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Operator {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "operator_seq_generator")
    @SequenceGenerator(name = "operator_seq_generator", sequenceName = "operator_sequence", initialValue = 1)
    @Column(name = "operator_Id", length = 20, nullable = false)
    private int operatorId;

    @Column(name = "operator_Name", length = 100, nullable = false)
    private String operatorName;

    @Column(name = "nic", length = 12, nullable = false)
    private String nic;

    @Column(name = "email", length = 30, nullable = false)
    private String email;

    @Column(name = "phonenumber", length = 10, nullable = false)
    private String phoneNumber;

    @Column(name = "register_date", columnDefinition = "DATETIME")
    private Date registedDate;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @OneToMany(mappedBy = "operator")
    private Set<Booking> bookings;

}
