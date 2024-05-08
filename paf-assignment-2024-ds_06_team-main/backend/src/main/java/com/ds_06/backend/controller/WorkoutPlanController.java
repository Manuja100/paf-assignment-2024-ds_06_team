package com.ds_06.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.ds_06.backend.model.Image;
import com.ds_06.backend.model.WorkoutPlan;
import com.ds_06.backend.service.WorkoutPlanService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/workoutPlans")
public class WorkoutPlanController {

    @Autowired
    
    private WorkoutPlanService workoutPlanService;

    @PostMapping("/add")
    public EntityModel<WorkoutPlan> addWorkoutPlanTest(@RequestBody WorkoutPlan plan) {
        WorkoutPlan addedPlan = workoutPlanService.addWorkoutPlan(plan);

        EntityModel<WorkoutPlan> incomingPlan = EntityModel.of(addedPlan,
            linkTo(methodOn(WorkoutPlanController.class).addWorkoutPlanTest(plan)).withSelfRel(), 
            linkTo(methodOn(WorkoutPlanController.class).getWorkoutPlanByUserId(plan.getUserID())).withRel("workoutPlansByUser"));
        
            return incomingPlan;
    }
    
    

    //add workout
    // @PostMapping("/add")
    // public WorkoutPlan addWorkoutPlan(@RequestBody WorkoutPlan plan){
    //     return workoutPlanService.addWorkoutPlan(plan);
    // }
    //get workout plans by user id
    @GetMapping("/{userID}")
    public ResponseEntity<Optional<List<WorkoutPlan>>> getWorkoutPlanByUserId(@PathVariable String userID){
        return new ResponseEntity<Optional<List<WorkoutPlan>>>(workoutPlanService.findWorkoutPlanByUserID(userID),HttpStatus.OK);
    }

    @GetMapping("/workout/{id}")
    public ResponseEntity<Optional<WorkoutPlan>> getMethodName(@PathVariable String id) {
        return new ResponseEntity<Optional<WorkoutPlan>>(workoutPlanService.findWorkoutPlanById(id), HttpStatus.OK);
    }


    //delete one workout plan by user id
    @DeleteMapping("/{workoutPlanID}")
    public String deleteWorkoutPlan(@PathVariable String workoutPlanID){
        return workoutPlanService.deleteWorkoutPlanById(workoutPlanID);
    }


    //update workout plan
    @PutMapping("/update")
    public ResponseEntity<WorkoutPlan> updateWorkoutPlan(@RequestBody WorkoutPlan plan){
        WorkoutPlan updatedPlan = workoutPlanService.updateWorkoutPlan(plan);
        return new ResponseEntity<>(updatedPlan,HttpStatus.OK);
    }

}
