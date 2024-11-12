package com.city.taxi.software.city.taxi.backend.Service;

import com.city.taxi.software.city.taxi.backend.DTO.request.NewReservationDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.ReservationUpdateDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.*;
import com.city.taxi.software.city.taxi.backend.Entity.Reservation;

import java.util.List;

public interface ReservationService {


    List<ReservationResponseDTO> getAllCancelReservtionByActiveStatefalse(boolean activestate);

    List<ReservationResponseDTO> getCancelReservtionById(int passengers);

    List<ReservationResponseDTO> getAllCancelReservtion();

    List<ReservationResponseDTO> viewAllReservtion();

    List<ReservationResponseDTO> vieAllReservtionById(int passengers);

    String newReservation(NewReservationDTO newReservationDTO);

    List<ReservationResponseDTO> viewAllReservtionbyfalse();

    List<ReservationResponseDTO> showNewRides();

    Reservation getReservationById(int reservationId);

    String updateReservation(ReservationUpdateDTO reservationUpdateDTO);

    List<RideHistoryDTO> RideHistory(int drivers);

    List<ReservationHistoryDTO> ReservationHistory(int passengers);

    List<ReservationDetailsDTO> AllReservation();

    Long passengerReservationCount(int passengerId);

    Long driverRideCount(int driverId);

    List<UnpayDTO> Unpay(int passengers);

    List<PendingDTO> Pending(int passengers);
}
