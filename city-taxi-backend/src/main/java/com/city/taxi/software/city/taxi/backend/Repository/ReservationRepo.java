package com.city.taxi.software.city.taxi.backend.Repository;

import com.city.taxi.software.city.taxi.backend.DTO.QueryInterface.*;
import com.city.taxi.software.city.taxi.backend.Entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface ReservationRepo extends JpaRepository<Reservation,Integer> {

    List<Reservation> findAllByActiveStateEquals(boolean b);

    List<Reservation> findByPassengersAndActiveStateEquals(int passengers, boolean activeState);

    List<Reservation> findByReservationIdAndActiveStateEquals(int reservationId, boolean b);


    List<Reservation> findReservationsByActiveStateEquals(boolean b);

    @Query(value = "select p.passenger_name as passengerName, p.phonenumber as phoneNumber ,r.reservation_id as reservationId, r.pickup_location as pickupLocation, r.dropping_location as droppingLocation, r.distance as distance, a.amount as amount from passenger p, reservation r, payment a where r.active_state= ?1 and p.passenger_id = r.passenger_id and a.reservation_id = r.reservation_id",nativeQuery = true)
    List<ShowReservation> showNewRides(boolean b);

    Object findByReservationId(int reservationId);

    Reservation findById(int reservationId);

    @Query(value = "select p.passenger_name as passengerName,r.reservation_id as reservationId, r.pickup_location as pickupLocation, r.dropping_location as droppingLocation, r.distance as distance, r.reservation_date as reservationDate, a.amount as amount from passenger p, reservation r, payment a where r.active_state= ?1 and r.driver_id= ?2 and p.passenger_id = r.passenger_id and a.reservation_id = r.reservation_id order by r.reservation_id desc" ,nativeQuery = true)
    List<RideHistory> RideHistory(boolean b, int drivers);

    @Query(value = "select d.driver_name as driverName, d.vehiclenumber as vehicleNumber,r.reservation_id as reservationId, r.pickup_location as pickupLocation, r.dropping_location as droppingLocation, r.distance as distance, r.reservation_date as reservationDate, a.amount as amount from driver d, reservation r, payment a where r.active_state= ?1 and r.passenger_id= ?2 and d.driver_id = r.driver_id and a.reservation_id = r.reservation_id order by r.reservation_id desc" ,nativeQuery = true)
    List<ReservationHistory> ReservationHistory(boolean b, int passengers);

    @Query(value = "select p.passenger_name as passengerName, d.driver_name as driverName, d.vehiclenumber as vehicleNumber, r.reservation_id as reservationId, r.pickup_location as pickupLocation, r.dropping_location as droppingLocation, r.distance as distance, r.reservation_date as reservationDate, a.amount as amount from passenger p, driver d, reservation r, payment a where r.active_state= ?1 and p.passenger_id = r.passenger_id and a.reservation_id = r.reservation_id and d.driver_id = r.driver_id order by r.reservation_id desc",nativeQuery = true)
    List<ReservationDetails> AllReservation(boolean b);

    @Query(value = "select count(*) from reservation where passenger_id= ?1",nativeQuery = true)
    Long getReservationCountofPassenger(int passengerId);

    @Query(value = "select count(*) from reservation where driver_id=?1",nativeQuery = true)
    Long getRideCountofDriver(int driverId);

    @Query(value = "select r.reservation_id as reservationId, r.pickup_location as pickupLocation, r.dropping_location as droppingLocation, r.distance as distance, a.amount as amount, d.vehicleNumber as vehicleNumber from reservation r, payment a, driver d where r.active_state= true and a.active_state=false and r.passenger_id=?1  and a.reservation_id = r.reservation_id and d.driver_id =r.driver_id",nativeQuery = true)
    List<UnpayDetails> unpayDetails(int passengers);

    @Query(value = "select a.amount as amount from reservation r, payment a where r.active_state= true and a.active_state=false and r.passenger_id=?1  and a.reservation_id = r.reservation_id",nativeQuery = true)
    List<PendingAmount> pending(int passengers);
}
