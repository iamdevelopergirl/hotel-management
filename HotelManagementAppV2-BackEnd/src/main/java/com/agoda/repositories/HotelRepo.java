package com.agoda.repositories;

import com.agoda.models.Hotel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepo extends CrudRepository<Hotel, Integer>{

}
