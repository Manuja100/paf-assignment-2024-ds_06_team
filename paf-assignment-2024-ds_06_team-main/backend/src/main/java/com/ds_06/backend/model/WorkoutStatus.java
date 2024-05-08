package com.ds_06.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Document(collection = "workoutstatus")


public class WorkoutStatus {

    @Id
    private String workoutstatusId;
    private float benchpress;
    private float deadlift;
    private float squat;
    private String time;
    private float distance;
    
}
