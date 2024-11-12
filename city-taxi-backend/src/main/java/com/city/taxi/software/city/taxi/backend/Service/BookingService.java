package com.city.taxi.software.city.taxi.backend.Service;

import com.city.taxi.software.city.taxi.backend.DTO.request.BookingSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.BookingUpdateDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.BookingNewDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.BookingResDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.BookingResponseDTO;

import java.util.List;

public interface BookingService {


    String saveBooking(BookingSaveDTO bookingSaveDTO);

    List<BookingResponseDTO> getAllBooking();

    List<BookingResDTO> BookingHistory(int operators);

    List<BookingNewDTO> showNewBookings();

    String updateBooking(BookingUpdateDTO bookingUpdateDTO);

    List<BookingResDTO> BookingRides(int driver);
}
