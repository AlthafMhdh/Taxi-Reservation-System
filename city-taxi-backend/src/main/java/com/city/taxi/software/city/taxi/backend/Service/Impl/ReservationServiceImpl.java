package com.city.taxi.software.city.taxi.backend.Service.Impl;

import com.city.taxi.software.city.taxi.backend.DTO.QueryInterface.*;
import com.city.taxi.software.city.taxi.backend.DTO.request.NewReservationDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.ReservationUpdateDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.*;
import com.city.taxi.software.city.taxi.backend.Entity.Driver;
import com.city.taxi.software.city.taxi.backend.Entity.Payment;
import com.city.taxi.software.city.taxi.backend.Entity.Rating;
import com.city.taxi.software.city.taxi.backend.Entity.Reservation;
import com.city.taxi.software.city.taxi.backend.Repository.*;
import com.city.taxi.software.city.taxi.backend.Service.ReservationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepo reservationRepo;

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private RatingRepo ratingRepo;

    @Autowired
    private PassengerRepo passengerRepo;

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional
    public String newReservation(NewReservationDTO newReservationDTO) {
        Reservation reservation = new Reservation(
               // passengerRepo.getReferenceById(newReservationDTO.getPassengers()),
               passengerRepo.getById(newReservationDTO.getPassengers()),
               newReservationDTO.getPickupLocation(),
               newReservationDTO.getDroppingLocation(),
               newReservationDTO.getDistance()
        );
        reservation.setDrivers(null);
        reservation.setReservationDate(new Date());
        reservation.setActiveState(false);
        reservationRepo.save(reservation);

        if (reservationRepo.existsById(reservation.getReservationId())){
            double amount;
            Payment payment = new Payment(
                    amount = newReservationDTO.getPayment()
            );
            payment.setPayDate(new Date());
            payment.setBookings(null);
            payment.setActiveState(false);
            payment.setReservations(reservation);
            payment.setAmount(amount);

            paymentRepo.save(payment);
        }

        if (reservationRepo.existsById(reservation.getReservationId())) {
            Rating rating = new Rating();
            rating.setRatedDate(new Date());
            rating.setReserve(reservation);
            rating.setRatingValue(null);
            rating.setDriver(null);
            rating.setPassenger(reservation.getPassengers());
            rating.setActiveState(false);

            ratingRepo.save(rating);
       }


        return "Reservation Done";
    }

    @Override
    @Transactional
    public List<ReservationResponseDTO> showNewRides() {
        boolean b= false;
        List<ShowReservation> newreservations = reservationRepo.showNewRides(b);

        List<ReservationResponseDTO> reservationList = new ArrayList<>();

        for (ShowReservation r : newreservations) {
            ReservationResponseDTO n= new ReservationResponseDTO(
                    r.getReservationId(),
                    r.getPickupLocation(),
                    r.getDroppingLocation(),
                    r.getDistance(),
                    r.getPassengerName(),
                    r.getPhoneNumber(),
                    r.getAmount()
            );
            reservationList.add(n);
       }

        return reservationList;
    }


    @Override
    @Transactional
    public String updateReservation(ReservationUpdateDTO reservationUpdateDTO) {

        Reservation existingReservation = reservationRepo.findById(reservationUpdateDTO.getReservationId());

        Driver driver = driverRepo.getById(reservationUpdateDTO.getDrivers());
        existingReservation.setDrivers(driver);
        modelMapper.map(reservationUpdateDTO, existingReservation);
        existingReservation.setActiveState(true);

        //update rating
        int rateId = ratingRepo.Reserve(reservationUpdateDTO.getReservationId());
        //return String.valueOf(rateId);

        Rating existingRating = ratingRepo.getReferenceById(rateId);
        existingRating.setDriver(driver);
//        ratingRepo.save(existingRating);

        if (reservationRepo.existsById(existingReservation.getReservationId())){
            reservationRepo.save(existingReservation);
            ratingRepo.save(existingRating);
            return " Reservation Updated Successfully.";

        }
        else{
            throw new DuplicateKeyException("Reservation not found.");
        }

    }

    @Override
    public List<RideHistoryDTO> RideHistory(int drivers) {
       boolean b= true;

        List<RideHistory> rides = reservationRepo.RideHistory(b,drivers);

        List<RideHistoryDTO> ridesList = new ArrayList<>();

        for (RideHistory r : rides) {
            RideHistoryDTO n = new RideHistoryDTO(
                    r.getReservationId(),
                    r.getPickupLocation(),
                    r.getDroppingLocation(),
                    r.getDistance(),
                    r.getReservationDate(),
                    r.getPassengerName(),
                    r.getAmount()
            );
            ridesList.add(n);
        }

        return ridesList;
    }

    @Override
    public List<ReservationHistoryDTO> ReservationHistory(int passengers) {
       boolean b= true;

        List<ReservationHistory> reservation = reservationRepo.ReservationHistory(b,passengers);

        List<ReservationHistoryDTO> reservationList = new ArrayList<>();

        for (ReservationHistory r: reservation) {
            ReservationHistoryDTO n= new ReservationHistoryDTO(
                    r.getReservationId(),
                    r.getPickupLocation(),
                    r.getDroppingLocation(),
                    r.getDistance(),
                    r.getReservationDate(),
                    r.getDriverName(),
                    r.getVehicleNumber(),
                    r.getAmount()
            );
            reservationList.add(n);
        }

        return reservationList;
    }

    @Override
    public List<ReservationDetailsDTO> AllReservation() {
        boolean b=true;
        List<ReservationDetails> allreservation = reservationRepo.AllReservation(b);

        List<ReservationDetailsDTO> reservationList = new ArrayList<>();

        for (ReservationDetails r: allreservation){
            ReservationDetailsDTO n =new ReservationDetailsDTO(
                    r.getReservationId(),
                    r.getPickupLocation(),
                    r.getDroppingLocation(),
                    r.getDistance(),
                    r.getReservationDate(),
                    r.getPassengerName(),
                    r.getDriverName(),
                    r.getVehicleNumber(),
                    r.getAmount()
            );
            reservationList.add(n);
        }

        return reservationList;
    }

    @Override
    public Long passengerReservationCount(int passengerId) {
        return reservationRepo.getReservationCountofPassenger(passengerId);
    }

    @Override
    public Long driverRideCount(int driverId) {
        return reservationRepo.getRideCountofDriver(driverId);
    }

    @Override
    public List<UnpayDTO> Unpay(int passengers) {

        List<UnpayDetails> unpay = reservationRepo.unpayDetails(passengers);

        List<UnpayDTO> unpayList = new ArrayList<>();

        for (UnpayDetails r: unpay) {
            UnpayDTO n= new UnpayDTO(
                    r.getReservationId(),
                    r.getPickupLocation(),
                    r.getDroppingLocation(),
                    r.getDistance(),
                    r.getVehicleNumber(),
                    r.getAmount()
            );
            unpayList.add(n);
        }

        return unpayList;
    }

    @Override
    public List<PendingDTO> Pending(int passengers) {

        List<PendingAmount> pending = reservationRepo.pending(passengers);

        List<PendingDTO> pendingList = new ArrayList<>();


        for (PendingAmount r: pending) {
            PendingDTO n= new PendingDTO(
                    r.getAmount()
            );
            pendingList.add(n);
        }

        return pendingList;
    }

    @Override
    public List<ReservationResponseDTO> viewAllReservtionbyfalse() {
        boolean b= false;
        List<Reservation> reservations = reservationRepo.findAllByActiveStateEquals(b);
        List<ReservationResponseDTO> reservationDTOList = new ArrayList<>();

        for (Reservation reservation : reservations) {

            ReservationResponseDTO reservationResponseDTO = modelMapper.map(reservation, ReservationResponseDTO.class);
            reservationDTOList.add(reservationResponseDTO);
        }

        return reservationDTOList;
    }


    @Override
    public List<ReservationResponseDTO> getAllCancelReservtionByActiveStatefalse(boolean activestate) {
        List<Reservation> reservations = reservationRepo.findAllByActiveStateEquals(activestate);
        List<ReservationResponseDTO> reservationDTOList = new ArrayList<>();

        for (Reservation reservation : reservations) {

            ReservationResponseDTO reservationResponseDTO = modelMapper.map(reservation, ReservationResponseDTO.class);
            reservationDTOList.add(reservationResponseDTO);
        }

        return reservationDTOList;
    }

    @Override
    public List<ReservationResponseDTO> getCancelReservtionById(int passengers) {
        boolean b= false;
        List<Reservation> reservations = reservationRepo.findByPassengersAndActiveStateEquals(passengers, b);
        List<ReservationResponseDTO> reservationDTOList = new ArrayList<>();

        for (Reservation reservation : reservations) {

            ReservationResponseDTO reservationResponseDTO = modelMapper.map(reservation, ReservationResponseDTO.class);
            reservationDTOList.add(reservationResponseDTO);
        }

        return reservationDTOList;
    }

    @Override
    public List<ReservationResponseDTO> getAllCancelReservtion() {
        boolean b= false;
        List<Reservation> reservations = reservationRepo.findAllByActiveStateEquals(b);
        List<ReservationResponseDTO> reservationDTOList = new ArrayList<>();

        for (Reservation reservation : reservations) {

            ReservationResponseDTO reservationResponseDTO = modelMapper.map(reservation, ReservationResponseDTO.class);
            reservationDTOList.add(reservationResponseDTO);
        }

        return reservationDTOList;

    }

    @Override
    public List<ReservationResponseDTO> viewAllReservtion() {
        boolean b= true;
        List<Reservation> reservations = reservationRepo.findAllByActiveStateEquals(b);
        List<ReservationResponseDTO> reservationDTOList = new ArrayList<>();

        for (Reservation reservation : reservations) {

            ReservationResponseDTO reservationResponseDTO = modelMapper.map(reservation, ReservationResponseDTO.class);
            reservationDTOList.add(reservationResponseDTO);
        }

        return reservationDTOList;

    }

    @Override
    public List<ReservationResponseDTO> vieAllReservtionById(int passengers) {
        boolean b= true;
        List<Reservation> reservations = reservationRepo.findByPassengersAndActiveStateEquals(passengers, b);
        List<ReservationResponseDTO> reservationDTOList = new ArrayList<>();

        for (Reservation reservation : reservations) {

            ReservationResponseDTO reservationResponseDTO = modelMapper.map(reservation, ReservationResponseDTO.class);
            reservationDTOList.add(reservationResponseDTO);
        }

        return reservationDTOList;
    }


    public Reservation getReservationById(int reservationId) {
        return (Reservation) reservationRepo.findByReservationId(reservationId);
    }


}
