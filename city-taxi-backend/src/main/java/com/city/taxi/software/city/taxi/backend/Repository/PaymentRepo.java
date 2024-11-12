package com.city.taxi.software.city.taxi.backend.Repository;

import com.city.taxi.software.city.taxi.backend.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface PaymentRepo extends JpaRepository<Payment,Integer> {


    @Query(value = "select payment_id from payment where reservation_id= ?1",nativeQuery = true)
    int Pay(int reservations);
}
