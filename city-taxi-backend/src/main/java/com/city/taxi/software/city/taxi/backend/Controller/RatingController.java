package com.city.taxi.software.city.taxi.backend.Controller;

import com.city.taxi.software.city.taxi.backend.DTO.request.RatingSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.RatingResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Rating;
import com.city.taxi.software.city.taxi.backend.Service.RatingService;
import com.city.taxi.software.city.taxi.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping(path = "/create")
    public ResponseEntity<StandardResponse> createRating(){
        Rating createdRating =ratingService.createRating();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",createdRating),
                HttpStatus.CREATED
        );
    }

    @PutMapping(path = "/save")
    public ResponseEntity<StandardResponse> saveRateValue(@RequestBody RatingSaveDTO ratingSaveDTO){
        String message = ratingService.updateRateValue(ratingSaveDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping("ratings/{driverId}")
    public ResponseEntity<StandardResponse> ratingsOfDriver(@PathVariable(value = "driverId") int driver){

        List<RatingResponseDTO> ratings = ratingService.ratingsOfDriver(driver);


        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", ratings),
                HttpStatus.OK
        );
    }


    //SaveRating
    //UpdateRating
    //DeleteRating
    //getAllRatingById (driverId)
    //AverageRatingById (driverId)

}
