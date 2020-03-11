package com.agoda.controllers;

import com.agoda.models.Hotel;
import com.agoda.repositories.HotelRepo;
import com.agoda.repositories.UserRepo;
import com.agoda.services.HotelService;
import com.cloudinary.Cloudinary;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = HotelService.class)
class HotelControllerTest {

    @InjectMocks
    HotelController hotelController;
    @MockBean
    HotelRepo hotelRepo;
    @MockBean
    UserRepo userRepo;
    @MockBean
    HotelService hotelService;
    @MockBean
    Cloudinary cloudinary;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(hotelController)
                .build();
    }

    @Test
    void getAllTest() throws Exception {
        when(hotelService.getAllHotels()).thenReturn(
                Collections.emptyList()
        );
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/hotels")
        )
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
        verify(hotelService).getAllHotels();
    }

    @Test
    void addHotelTest() throws Exception {
        Hotel hotel = new Hotel(123,"test", "testAddress", "testAddress2", "testCity", "600000", "123456", "image");
        String fileName = "image.jpg";
        MockMultipartFile multipartFile = new MockMultipartFile("image", fileName,
                "image/jpeg", "test image content".getBytes());
        when(hotelService.saveHotel(any(Hotel.class))).thenReturn(hotel);
        when(hotelService.getImage(multipartFile)).thenReturn("image");
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/api/hotel")
                        .file(multipartFile)
                        .param("name", hotel.getName())
                        .param("address1", hotel.getAddress1())
                        .param("city", hotel.getCity())
                        .param("postalCode", hotel.getPostalCode())
                        .param("phoneNumber", hotel.getPhoneNumber())
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        )
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.name").value(hotel.getName()));

        verify(hotelService, times(1)).saveHotel(any(Hotel.class));
    }


    @Test
    void updateHotelTest() throws Exception {
        Hotel hotel = new Hotel(1,"test", "testAddress", "testAddress2", "testCity", "600000", "123456", "image");
        Hotel hotelUpdated = new Hotel(1,"test", "testAddress", "testAddress2", "testCity", "600000", "123456", "image2");
        String fileName = "image.jpg";
        MockMultipartFile multipartFile = new MockMultipartFile("image", fileName,
                "image/jpeg", "test image content".getBytes());
        when(hotelService.getImage(multipartFile)).thenReturn("image2");
        when(hotelService.saveHotel(any(Hotel.class))).thenReturn(hotelUpdated);
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/api/hotel/1")
                        .file(multipartFile)
                        .with(request -> {
                            request.setMethod("PUT");
                            return request;
                        })
                        .param("name", hotel.getName())
                        .param("address1", hotel.getAddress1())
                        .param("city", hotel.getCity())
                        .param("postalCode", hotel.getPostalCode())
                        .param("phoneNumber", hotel.getPhoneNumber())
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        )
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.image").value(hotelUpdated.getImage()));
        verify(hotelService, times(1)).saveHotel(any(Hotel.class));
    }

    @Test
    void updateHotelWithOutImageTest() throws Exception {
        Hotel hotel = new Hotel(1,"test", "testAddress", "testAddress2", "testCity", "600000", "123456");
        Hotel hotelUpdated = new Hotel(1,"test@DLF", "testAddress", "testAddress2", "testCity", "600000", "123456");
//        String fileName = "image.jpg";
//        MockMultipartFile multipartFile = new MockMultipartFile("image", fileName,
//                "image/jpeg", "test image content".getBytes());
//        when(hotelService.getImage(multipartFile)).thenReturn("image2");
        when(hotelService.updateHotel(any(Hotel.class))).thenReturn(hotelUpdated);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/hotel/1")
                        //.file(multipartFile)
//                        .with(request -> {
//                            request.setMethod("PUT");
//                            return request;
//                        })
                        .param("name", hotel.getName())
                        .param("address1", hotel.getAddress1())
                        .param("city", hotel.getCity())
                        .param("postalCode", hotel.getPostalCode())
                        .param("phoneNumber", hotel.getPhoneNumber())
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        )
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.name").value(hotelUpdated.getName()));
        verify(hotelService, times(1)).updateHotel(any(Hotel.class));
    }

    @Test
    void deleteHotelTest() throws Exception {
        Hotel hotel = new Hotel(1,"test", "testAddress", "testAddress2", "testCity", "600000", "123456", "image");
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/hotel/1")
        )
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
        verify(hotelService, times(1)).deleteHotel(hotel.getId());
    }

}