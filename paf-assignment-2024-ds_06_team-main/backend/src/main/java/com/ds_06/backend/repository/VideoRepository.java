package com.ds_06.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ds_06.backend.model.Video;

public interface VideoRepository extends MongoRepository<Video, String> {

}
