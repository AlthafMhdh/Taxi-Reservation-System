package com.city.taxi.software.city.taxi.backend.Service.Impl;

import com.city.taxi.software.city.taxi.backend.DTO.QueryInterface.BookingHistory;
import com.city.taxi.software.city.taxi.backend.DTO.QueryInterface.BookingsNew;
import com.city.taxi.software.city.taxi.backend.DTO.request.BookingSaveDTO;
import com.city.taxi.software.city.taxi.backend.DTO.request.BookingUpdateDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.BookingNewDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.BookingResDTO;
import com.city.taxi.software.city.taxi.backend.DTO.response.BookingResponseDTO;
import com.city.taxi.software.city.taxi.backend.Entity.Booking;
import com.city.taxi.software.city.taxi.backend.Entity.Driver;
import com.city.taxi.software.city.taxi.backend.Entity.Payment;
import com.city.taxi.software.city.taxi.backend.Repository.BookingRepo;
import com.city.taxi.software.city.taxi.backend.Repository.DriverRepo;
import com.city.taxi.software.city.taxi.backend.Repository.OperatorRepo;
import com.city.taxi.software.city.taxi.backend.Repository.PaymentRepo;
import com.city.taxi.software.city.taxi.backend.Service.BookingService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private OperatorRepo operatorRepo;

    @Autowired
    private PaymentRepo paymentRepo;

    @Override
    public String saveBooking(BookingSaveDTO bookingSaveDTO) {
        Booking booking = new Booking(
                operatorRepo.getReferenceById(bookingSaveDTO.getOperator()),
                bookingSaveDTO.getPassengerName(),
                bookingSaveDTO.getPhoneNumber(),
                bookingSaveDTO.getPickupLocation(),
                bookingSaveDTO.getDroppingLocation(),
                bookingSaveDTO.getDistance()
        );
        booking.setActiveState(false);
        booking.setBookingDate(new Date());
    //    booking.setDriver(null);

        if (!bookingRepo.existsById(booking.getBookingId())){
            bookingRepo.save(booking);

            double amount;
            Payment payment = new Payment(
                    amount = bookingSaveDTO.getPayment()
            );
            payment.setPayDate(new Date());
            payment.setBookings(booking);
            payment.setActiveState(false);
            payment.setReservations(null);
            payment.setAmount(amount);

            paymentRepo.save(payment);

            return " Booking Successfully Done. ";

        }
        else{
            throw new DuplicateKeyException("Already Booked.");
        }
    }

    @Override
    public List<BookingResponseDTO> getAllBooking() {
        List<Booking> bookings = bookingRepo.findAll();
        List<BookingResponseDTO> bookingResponseDTOs = new ArrayList<>();

        for (Booking booking : bookings) {
            BookingResponseDTO bookingResponseDTO = modelMapper.map(booking, BookingResponseDTO.class);
            bookingResponseDTOs.add(bookingResponseDTO);
        }
        return bookingResponseDTOs;

    }

    @Override
    public List<BookingResDTO> BookingHistory(int operators) {
        boolean b= true;

        List<BookingHistory> booking = bookingRepo.BookingHistory(b,operators);

        List<BookingResDTO> bookingList = new ArrayList<>();

        for (BookingHistory r: booking) {
            BookingResDTO n= new BookingResDTO(
                    r.getBookingId(),
                    r.getPassengerName(),
                    r.getPhoneNumber(),
                    r.getPickupLocation(),
                    r.getDroppingLocation(),
                    r.getBookingDate(),
                    r.getDistance(),
                    r.getAmount()
            );
            bookingList.add(n);
        }

        return bookingList;
    }

    @Override
    public List<BookingNewDTO> showNewBookings() {
        boolean b= false;
        List<BookingsNew> newbookings = bookingRepo.showNewBookings(b);

        List<BookingNewDTO> bookingList = new ArrayList<>();

        for ( BookingsNew r : newbookings) {
            BookingNewDTO n= new BookingNewDTO(
                    r.getBookingId(),
                    r.getPassengerName(),
                    r.getPhoneNumber(),
                    r.getPickupLocation(),
                    r.getDroppingLocation(),
                    r.getDistance(),
                    r.getAmount()
            );
            bookingList.add(n);
        }

        return bookingList;

    }

    @Override
    public String updateBooking(BookingUpdateDTO bookingUpdateDTO) {

        Booking existingBooking = bookingRepo.getReferenceById(bookingUpdateDTO.getBookingId());

        Driver driver = driverRepo.getById(bookingUpdateDTO.getDriver());
        existingBooking.setDriver(driver);
        modelMapper.map(bookingUpdateDTO, existingBooking);
        existingBooking.setActiveState(true);

        if (bookingRepo.existsById(existingBooking.getBookingId())){
            bookingRepo.save(existingBooking);
            return " Booking Updated Successfully.";

        }
        else{
            throw new DuplicateKeyException("Reservation not found.");
        }
    }

    @Override
    public List<BookingResDTO> BookingRides(int driver) {

        boolean b= true;

        List<BookingHistory> booking = bookingRepo.BookingRides(b,driver);

        List<BookingResDTO> bookingList = new ArrayList<>();

        for (BookingHistory r: booking) {
            BookingResDTO n= new BookingResDTO(
                    r.getBookingId(),
                    r.getPassengerName(),
                    r.getPhoneNumber(),
                    r.getPickupLocation(),
                    r.getDroppingLocation(),
                    r.getBookingDate(),
                    r.getDistance(),
                    r.getAmount()
            );
            bookingList.add(n);
        }

        return bookingList;
    }


}
