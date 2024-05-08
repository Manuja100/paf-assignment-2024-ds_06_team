package com.ds_06.backend.controller;

import java.util.List;

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

import com.ds_06.backend.model.WorkoutStatus;
import com.ds_06.backend.service.WorkoutStatusService;

@RestController
@RequestMapping("/workoutstatus")



public class WorkoutStatusController {
    @Autowired
    private WorkoutStatusService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkoutStatus createStatus(@RequestBody WorkoutStatus status){
        return service.addStatus(status);
    }

    //Retrieve all workout status
    @GetMapping("/")
    public List<WorkoutStatus> getStatus(){
        return service.findAllStatus();
    }


    //Retreave one workout status according to the workoutstatusId
    @GetMapping("/{statusId}")
    public WorkoutStatus getStatus(@PathVariable String statusId){
        return service.getStatusByStatusId(statusId);
    }

    //Retrive workout status according to there number of days
    @GetMapping("/distance/{distance}")
    public List<WorkoutStatus> findStatusUsingDistance(@PathVariable float distance){
        return service.getStatusDistance(distance);
    }

    //Update the workout status
    @PutMapping
    public ResponseEntity<WorkoutStatus> updateStatus(@RequestBody WorkoutStatus status){
        WorkoutStatus updateStatus = service.updateStatus(status);
        return new ResponseEntity<>(updateStatus, HttpStatus.OK);
    }


    //Delete the workout status according to the workoutstatusId
    @DeleteMapping("/{statusId}")
    public String deleteStatus(@PathVariable String statusId){
        return service.deleteStatus(statusId);
    }
}
