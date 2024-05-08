package com.ds_06.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds_06.backend.model.WorkoutStatus;
import com.ds_06.backend.repository.WorkoutStatusRepository;


@Service
public class WorkoutStatusService {
      @Autowired
    private WorkoutStatusRepository repository;
    
    //Save
    public WorkoutStatus addStatus(WorkoutStatus status){
        status.setWorkoutstatusId(UUID.randomUUID().toString().split("-")[0]);
        return repository.save(status);
    }

    //Read
    public List<WorkoutStatus> findAllStatus(){
        return repository.findAll();
    }

    //Read by ID
    public WorkoutStatus getStatusByStatusId(String statusId){
        return repository.findById(statusId).get();
    }

    //Read by no of days
    public List<WorkoutStatus> getStatusDistance(float distance){
        return repository.findByDistance(distance);
    }

    //Update
    public WorkoutStatus updateStatus(WorkoutStatus status){
        return repository.save(status);
    } 

    //Delete
    public String deleteStatus(String statusId){
        repository.deleteById(statusId);
        return statusId+" status deleted from the profile";
    }
}
