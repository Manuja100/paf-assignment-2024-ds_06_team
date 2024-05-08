package com.ds_06.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds_06.backend.model.Image;
import com.ds_06.backend.model.User;
import com.ds_06.backend.model.WorkoutPlan;
import com.ds_06.backend.repository.ImageRepository;
import com.ds_06.backend.repository.WorkoutPlanRepository;



@Service
public class WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    //Create Read Update Delete Functions

    //create service
    public WorkoutPlan addWorkoutPlan(WorkoutPlan plan) {
        return workoutPlanRepository.save(plan);
    }

    //get by workout plan id
    public Optional<WorkoutPlan> findWorkoutPlanById(String id){
        return workoutPlanRepository.findById(id);
    }

    //find all the workout plans service
    public List<WorkoutPlan> findAllWorkoutPlans(){
        return workoutPlanRepository.findAll();
    }

    //service to find workout plan by workout plan id
    public Optional<List<WorkoutPlan>> findWorkoutPlanByUserID(String userID){
        return workoutPlanRepository.findWorkoutPlanByUserID(userID);
    }

    //service to delete workout by workout plan id
    public String deleteWorkoutPlanById(String workoutPlanID){
        workoutPlanRepository.deleteById(workoutPlanID);
        return "Workout Plan Deleted";
    }


    //service to update workout by workout plan
    public WorkoutPlan updateWorkoutPlan(WorkoutPlan plan){

        WorkoutPlan existingWorkoutPlan = workoutPlanRepository.findById(plan.get_id()).get();
        existingWorkoutPlan.setName(plan.getName());
        existingWorkoutPlan.setSplit(plan.getSplit());
        existingWorkoutPlan.setDays(plan.getDays());

        return workoutPlanRepository.save(plan);
    }

}