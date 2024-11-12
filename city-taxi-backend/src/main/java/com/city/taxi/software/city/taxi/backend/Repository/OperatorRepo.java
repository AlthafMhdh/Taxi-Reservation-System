package com.city.taxi.software.city.taxi.backend.Repository;

import com.city.taxi.software.city.taxi.backend.Entity.Operator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface OperatorRepo extends JpaRepository<Operator,Integer> {


    List<Operator> findAllByActiveStateEquals(boolean activestate);

    Operator findByEmailAndNic(String email, String nic);

    boolean existsByEmail(String email);
}
