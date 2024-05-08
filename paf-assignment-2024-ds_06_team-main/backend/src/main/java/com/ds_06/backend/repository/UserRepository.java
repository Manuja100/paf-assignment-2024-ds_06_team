package com.ds_06.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ds_06.backend.model.User;
import java.util.List;


@Repository
public interface UserRepository extends MongoRepository<User, String>{

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

}
