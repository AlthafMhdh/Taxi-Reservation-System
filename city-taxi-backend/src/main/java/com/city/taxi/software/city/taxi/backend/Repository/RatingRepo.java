package com.city.taxi.software.city.taxi.backend.Repository;

import com.city.taxi.software.city.taxi.backend.DTO.QueryInterface.Ratings;
import com.city.taxi.software.city.taxi.backend.Entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface RatingRepo extends JpaRepository<Rating,Integer> {


  @Query(value ="select rating_Id from rating where reservation_id= ?1",nativeQuery = true )
  int Reserve(int reserve);

    @Query(value="select p.passenger_name as passengerName, r.rating_id as ratingId, r.rating_value as ratingValue, n.pickup_location as pickupLocation, n.dropping_location as dropLocation, n.reservation_date as reservationDate from passenger p, rating r, reservation n where r.active_state= ?1 and r.driver_id = ?2 and p.passenger_id = r.passenger_id and r.reservation_id = n.reservation_id order by  r.rating_id desc ",nativeQuery = true)
    List<Ratings> RatingsOfDriver(boolean b, int driver);
}
