package com.ds_06.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.ds_06.backend.model.Likes;



public interface LikeRepository extends MongoRepository<Likes, String> {
     // Custom query method to find likes by post id
     List<Likes> findByPostId(String postId);

     // Custom query method to find likes by user id
     List<Likes> findByUserId(String userId);
 
     // Custom query using @Query annotation to find likes by post id
     @Query("{ 'postId' : ?0 }")
     List<Likes> getLikesByPostId(String postId);
 
     // Custom query using @Query annotation to find likes by user id
     @Query("{ 'userId' : ?0 }")
     List<Likes> getLikesByUserId(String userId);
}


