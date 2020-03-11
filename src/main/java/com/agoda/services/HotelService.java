package com.agoda.services;

import com.agoda.models.Hotel;
import com.agoda.repositories.HotelRepo;
import com.agoda.repositories.UserRepo;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    public Hotel updateHotel(Hotel hotel){
        Hotel hotelDto = hotelRepo.getOne(hotel.getId());

        hotelDto.setName(hotel.getName());
        hotelDto.setAddress1(hotel.getAddress1());
        hotelDto.setAddress2(hotel.getAddress2());
        hotelDto.setCity(hotel.getCity());
        hotelDto.setPostalCode(hotel.getPostalCode());
        hotelDto.setPhoneNumber(hotel.getPhoneNumber());

        return hotelRepo.save(hotelDto);
    }
    public void deleteHotel(int id) {
        hotelRepo.deleteById(id);
    }

    public String getImage(MultipartFile image) {
        String imageToAdd = "";
        File toUpload = null;
        Path filepath = Paths.get(System.getProperty("user.dir"), image.getOriginalFilename());
        try (OutputStream os = Files.newOutputStream(filepath)) {
            os.write(image.getBytes());

            toUpload = new File(String.valueOf(filepath));
            Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap("cloud_name", "elakyahotelmanagementapp",
                    "api_key", "158233582135223",
                    "api_secret", "8DasrmfvrvJInKFwa2TAIzZZEDs"));

            Map uploadResult = cloudinary.uploader().upload(toUpload, ObjectUtils.emptyMap());
            imageToAdd = (String) uploadResult.get("url");
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            toUpload.delete();
        }
        return imageToAdd;
    }

}
