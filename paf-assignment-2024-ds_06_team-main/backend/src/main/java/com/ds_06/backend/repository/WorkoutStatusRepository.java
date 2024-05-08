package com.ds_06.backend.repository;

import java.util.List;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.ds_06.backend.model.WorkoutStatus;

public interface WorkoutStatusRepository extends MongoRepository<WorkoutStatus,String>{
    //custom implementation to find meal plan by mealID
    List<WorkoutStatus> findByDistance(float distance);

}