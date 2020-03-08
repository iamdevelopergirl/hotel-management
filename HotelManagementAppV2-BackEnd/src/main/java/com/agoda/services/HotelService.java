package com.agoda.services;

import com.agoda.models.Hotel;
import com.agoda.repositories.HotelRepo;
import com.agoda.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HotelService {

    @Autowired
    HotelRepo hotelRepo;
    @Autowired
    UserRepo userRepo;

    public List<Hotel> getAllHotels() {
        List<Hotel> hotelList = new ArrayList<>();
        hotelRepo.findAll().forEach(hotelList::add);
        return hotelList;
    }

    public Hotel saveHotel(Hotel hotel) {
        hotel.setUser(userRepo.getOne(418));
        return hotelRepo.save(hotel);
    }

    public void deleteHotel(int id) {
        hotelRepo.deleteById(id);
    }
}
