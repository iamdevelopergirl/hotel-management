package com.agoda.controllers;

import com.agoda.models.Hotel;
import com.agoda.models.User;
import com.agoda.services.HotelService;
import com.agoda.services.UserService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HotelController {
    private static final Logger LOGGER = LoggerFactory.getLogger(HotelController.class);
    @Autowired
    HotelService hotelService;
    @Autowired
    UserService userService;

    @GetMapping("/hotels")
    public List<Hotel> getAll() {
        return hotelService.getAllHotels();
    }

    @PostMapping(value = "/hotel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Hotel> add(@RequestParam(value = "image") MultipartFile image,
                                     @RequestParam("name") String name,
                                     @RequestParam("address1") String address1,
                                     @RequestParam(value = "address2", required = false) String address2,
                                     @RequestParam("city") String city,
                                     @RequestParam("postalCode") String postalCode,
                                     @RequestParam("phoneNumber") String phoneNumber,
                                     User userIn) throws URISyntaxException {
        LOGGER.info("Request to add hotel {}", name);

        String imageToAdd = hotelService.getImage(image);

        Hotel hotel = new Hotel(name, address1, address2, city, postalCode, phoneNumber, imageToAdd);
        hotel = hotelService.saveHotel(hotel);
        return ResponseEntity.created(new URI("/api/hotels")).body(hotel);
    }


    @PutMapping("/hotel/{id}")
    public ResponseEntity<Hotel> update(@RequestParam(value = "image", required = false) MultipartFile image,
                                        @RequestParam("name") String name,
                                        @RequestParam("address1") String address1,
                                        @RequestParam(value = "address2", required = false) String address2,
                                        @RequestParam("city") String city,
                                        @RequestParam("postalCode") String postalCode,
                                        @RequestParam("phoneNumber") String phoneNumber,
                                        @PathVariable int id) {

        if(image != null){
            String imageToUpdate = hotelService.getImage(image);
            Hotel hotel = new Hotel(id, name, address1, address2, city, postalCode, phoneNumber, imageToUpdate);
            hotel = hotelService.saveHotel(hotel);
            return ResponseEntity.ok().body(hotel);
        }

        Hotel hotel = new Hotel(id, name, address1, address2, city, postalCode, phoneNumber);
        hotel = hotelService.updateHotel(hotel);
        return ResponseEntity.ok().body(hotel);
    }

    @DeleteMapping("/hotel/{id}")
    public ResponseEntity<Object> delete(@PathVariable int id) {
        LOGGER.info("Request to delete hotel: {}", id);
        hotelService.deleteHotel(id);
        return ResponseEntity.ok().build();
    }

}