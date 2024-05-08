package com.ds_06.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ds_06.backend.model.Meal;
import com.ds_06.backend.model.WorkoutPlan;

public interface MealRepository extends MongoRepository<Meal,String>{
    //custom implementation to find meal plan by mealID
    List<Meal> findByDays(int days);
    Optional<List<Meal>> findMealPlanByUserID(String userID);

}
