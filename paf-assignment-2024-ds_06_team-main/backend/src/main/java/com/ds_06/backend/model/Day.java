package com.ds_06.backend.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Day{
    private int dayNumber; 
    private List<String> muscleGroups;
    //list variable refers 
    private List<ExerciseSet> sets;
}