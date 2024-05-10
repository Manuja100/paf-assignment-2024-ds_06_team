package com.ds_06.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ds_06.backend.model.Meal;
import com.ds_06.backend.model.WorkoutPlan;
import com.ds_06.backend.repository.MealRepository;

@Service
public class MealService {
    @Autowired
    private MealRepository repository;
    
    //Save
    public Meal addMeal(Meal meal){
        meal.setMealId(UUID.randomUUID().toString().split("-")[0]);
        return repository.save(meal);
    }

    //Read
    public List<Meal> findAllMeals(Sort sort){
        return repository.findAll(sort);
    }


    //Read by ID
    public Meal getMealByMealId(String mealId){
        return repository.findById(mealId).get();
    }

    //Read by no of days
    public List<Meal> getMealByDays(int days){
        return repository.findByDays(days);
    }

    //Update
    public Meal updateMeal(Meal meal){
        return repository.save(meal);
    } 

    //Delete
    public String deleteMeal(String mealId){
        repository.deleteById(mealId);
        return mealId+" meal deleted from the profile";
    }

    public Optional<List<Meal>> findMealPlanByUserID(String userID){
        return repository.findMealPlanByUserID(userID);
    }
}
