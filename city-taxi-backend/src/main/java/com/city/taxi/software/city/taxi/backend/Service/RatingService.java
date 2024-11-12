package com.city.taxi.software.city.taxi.backend.Service;

import com.city.taxi.software.city.taxi.backend.DTO.request.RatingSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.RatingResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Rating;

import java.util.List;

public interface RatingService {

    Rating createRating();

    String updateRateValue(RatingSaveDTO ratingSaveDTO);

    List<RatingResponseDTO> ratingsOfDriver(int driver);
}
