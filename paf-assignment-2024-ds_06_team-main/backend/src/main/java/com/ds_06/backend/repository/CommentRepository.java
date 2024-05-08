package com.ds_06.backend.repository;

//import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.ds_06.backend.model.Comments;


public interface CommentRepository extends MongoRepository<Comments, String> {

    // Add custom query methods if needed
}

