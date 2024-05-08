package com.ds_06.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseSet{
    private String exerciseName;
    private int sets;
    private int reps; 
}