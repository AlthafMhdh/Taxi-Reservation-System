package com.city.taxi.software.city.taxi.backend.Repository;

import com.city.taxi.software.city.taxi.backend.Entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface PassengerRepo extends JpaRepository<Passenger,Integer> {


    Passenger findByEmail(String email);


    List<Passenger> findAllByActiveStateEquals(boolean activestate);

    Passenger findByPassengerId(int passengerId);

    List<Passenger> findByEmailAndNicEquals(String email, String nic);

    Passenger findByEmailAndNic(String email, String nic);

    boolean existsByEmailAndNic(String email, String nic);


    boolean existsByEmail(String email);
}
