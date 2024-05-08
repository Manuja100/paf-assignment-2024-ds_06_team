package com.ds_06.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ds_06.backend.model.Meal;
import com.ds_06.backend.service.MealService;

@RestController
@RequestMapping("/meals")
public class MealController {
    @Autowired
    private MealService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Meal createMeal(@RequestBody Meal meal){
        return service.addMeal(meal);
    }

    //Retrieve all Meal Plans
    @GetMapping("/")
    public List<Meal> getMeals(){
        return service.findAllMeals();
    }


    //Retreave one meal plan according to the MealID
    @GetMapping("/{mealId}")
    public Meal getMeal(@PathVariable String mealId){
        return service.getMealByMealId(mealId);
    }

    //Retrive Meal Plans according to there number of days
    @GetMapping("/days/{days}")
    public List<Meal> findMealUsingDays(@PathVariable int days){
        return service.getMealByDays(days);
    }

    //Update the meal plan
    @PutMapping
    public ResponseEntity<Meal> updateMeal(@RequestBody Meal meal){
        Meal updateMeal = service.updateMeal(meal);
        return new ResponseEntity<>(updateMeal, HttpStatus.OK);
    }

    //Delete the meal plan according to the mealID
    @DeleteMapping("/{mealId}")
    public String deleteMeal(@PathVariable String mealId){
        return service.deleteMeal(mealId);
    }

    @GetMapping("/mealByUser/{userID}")
    public ResponseEntity<Optional<List<Meal>>> getMealPlanByUserId(@PathVariable String userID){
        return new ResponseEntity<Optional<List<Meal>>>(service.findMealPlanByUserID(userID),HttpStatus.OK);
    }


}
