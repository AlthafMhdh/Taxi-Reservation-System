package com.city.taxi.software.city.taxi.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class CityTaxiBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CityTaxiBackendApplication.class, args);
	}

}
