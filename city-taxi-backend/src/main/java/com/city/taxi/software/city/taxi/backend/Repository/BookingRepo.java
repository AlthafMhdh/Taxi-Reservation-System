package com.city.taxi.software.city.taxi.backend.Repository;

import com.city.taxi.software.city.taxi.backend.DTO.QueryInterface.BookingHistory;
import com.city.taxi.software.city.taxi.backend.DTO.QueryInterface.BookingsNew;
import com.city.taxi.software.city.taxi.backend.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface BookingRepo extends JpaRepository<Booking,Integer> {

    @Query(value = "select b.booking_id as BookingId, b.passenger_name as PassengerName, b.phonenumber as PhoneNumber, b.pickup_location as pickupLocation, b.dropping_location as droppingLocation, b.booking_date as bookingDate, b.distance as Distance, a.amount as amount from operator_booking b, payment a where b.active_state=?1 and b.operator_id =?2 and a.booking_id = b.booking_id order by  b.booking_id desc",nativeQuery = true)
    List<BookingHistory> BookingHistory(boolean b, int operators);

    @Query(value = "select b.passenger_name as passengerName, b.phonenumber as phoneNumber ,b.booking_id as bookingId, b.pickup_location as pickupLocation, b.dropping_location as droppingLocation, b.distance as distance, a.amount as amount from  operator_booking b, payment a where b.active_state= ?1 and a.booking_id = b.booking_id order by  b.booking_id desc",nativeQuery = true)
    List<BookingsNew> showNewBookings(boolean b);

    @Query(value = "select b.booking_id as BookingId, b.passenger_name as PassengerName, b.phonenumber as PhoneNumber, b.pickup_location as pickupLocation, b.dropping_location as droppingLocation, b.booking_date as bookingDate, b.distance as Distance, a.amount as amount from operator_booking b, payment a where b.active_state=?1 and b.driver_id =?2 and a.booking_id = b.booking_id order by  b.booking_id desc",nativeQuery = true)
    List<BookingHistory> BookingRides(boolean b, int driver);
}
