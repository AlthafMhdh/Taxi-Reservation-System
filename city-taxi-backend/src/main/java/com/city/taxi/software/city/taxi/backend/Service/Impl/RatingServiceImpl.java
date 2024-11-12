package com.city.taxi.software.city.taxi.backend.Service.Impl;

import com.city.taxi.software.city.taxi.backend.DTO.QueryInterface.Ratings;
import com.city.taxi.software.city.taxi.backend.DTO.request.RatingSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.RatingResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Rating;
import com.city.taxi.software.city.taxi.backend.Repository.RatingRepo;
import com.city.taxi.software.city.taxi.backend.Repository.ReservationRepo;
import com.city.taxi.software.city.taxi.backend.Service.RatingService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    RatingRepo ratingRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ReservationRepo reservationRepo;

    @Override
    public Rating createRating() {
        Rating rating = new Rating();
        rating.setActiveState(false);

        return ratingRepo.save(rating);
    }

    @Override
    public String updateRateValue(RatingSaveDTO ratingSaveDTO) {

        int rateId = ratingRepo.Reserve(ratingSaveDTO.getReserve());
        //return String.valueOf(rateId);

        Rating existingRating = ratingRepo.getReferenceById(rateId);
        existingRating.setRatingValue(ratingSaveDTO.getRatingValue());
        existingRating.setRatedDate(new Date());
        existingRating.setActiveState(true);

        ratingRepo.save(existingRating);
        return "Rating Added";

    }

    @Override
    public List<RatingResponseDTO> ratingsOfDriver(int driver) {
        boolean b= true;

        List<Ratings> ratings = ratingRepo.RatingsOfDriver(b,driver);

        List<RatingResponseDTO> ratingList = new ArrayList<>();

        for (Ratings r : ratings){
            RatingResponseDTO n = new RatingResponseDTO(
                    r.getRatingId(),
                    r.getRatingValue(),
                    r.getPassengerName(),
                    r.getPickupLocation(),
                    r.getDropLocation(),
                    r.getReservationDate()
            );
            ratingList.add(n);
        }

        return ratingList;
    }


}
