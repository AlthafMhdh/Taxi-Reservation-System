package com.city.taxi.software.city.taxi.backend.Entity;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "rating")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rating_seq_generator")
    @SequenceGenerator(name = "rating_seq_generator", sequenceName = "rating_sequence", initialValue = 1)
    @Column(name = "rating_Id", length = 20, nullable = false)
    private int ratingId;

    @Column(name = "ratingValue", length = 20)
    private String ratingValue;

    @Column(name = "rate_date", columnDefinition = "DATETIME")
    private Date ratedDate;

    @Column(name = "active_state",columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @ManyToOne
    @JoinColumn(name="passenger_id")
    private Passenger passenger;

    @ManyToOne
    @JoinColumn(name="driver_id")
    private Driver driver;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reservation_id")
    private Reservation reserve;


}
