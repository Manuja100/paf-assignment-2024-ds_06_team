package com.ds_06.backend.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ds_06.backend.model.Image;





public interface ImageRepository extends MongoRepository<Image, String> {
    Optional<List<Image>> findImageByUserID(String userID);
    Optional<List<Image>> findImageByUsername(String username);
}
