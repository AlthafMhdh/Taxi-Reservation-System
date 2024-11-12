package com.city.taxi.software.city.taxi.backend.Repository;

import com.city.taxi.software.city.taxi.backend.Entity.DriverAvailable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface DriverAvailableRepo extends JpaRepository<DriverAvailable,Integer> {

    List<DriverAvailable> findAllByActiveStateEquals(boolean b);
}
