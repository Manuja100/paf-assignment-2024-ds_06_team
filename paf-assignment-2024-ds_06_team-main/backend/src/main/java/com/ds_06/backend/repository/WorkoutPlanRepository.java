package com.ds_06.backend.repository;

import java.util.List;
import java.util.Optional;

// import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.ds_06.backend.model.WorkoutPlan;

public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlan,String>{
    //custom implementation to find workout plan by user id
    Optional<List<WorkoutPlan>> findWorkoutPlanByUserID(String userID);
    Optional<WorkoutPlan> findById(String id);
}