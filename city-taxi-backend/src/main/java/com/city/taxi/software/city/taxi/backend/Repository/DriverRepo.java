package com.city.taxi.software.city.taxi.backend.Repository;

import com.city.taxi.software.city.taxi.backend.DTO.QueryInterface.DriverDetails;
import com.city.taxi.software.city.taxi.backend.Entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface DriverRepo extends JpaRepository<Driver,Integer> {

    Driver findByEmail(String email);

    List<Driver> findAllByActiveStateEquals(boolean activestate);

    Object findByDriverId(int driverId);

    Driver findByEmailAndNic(String email, String nic);

    boolean existsByEmail(String email);

    @Query(value = "select d.driver_id as driverId, d.driver_name as driverName, d.nic as NIC, d.email as Email, d.phonenumber as PhoneNumber, d.vehiclemodel as VehicleModel, d.vehiclenumber as VehicleNumber, d.register_date as registrationDate, avg(r.rating_value) as averageRating from driver d left join rating r on d.driver_id = r.driver_id where d.active_state = ?1 group by d.driver_id, d.driver_name, d.nic, d.email, d.phonenumber, d.vehiclemodel, d.vehiclenumber, d.seat_capacity, d.register_date",nativeQuery = true)
    List<DriverDetails> AllDrivers(boolean b);
}
