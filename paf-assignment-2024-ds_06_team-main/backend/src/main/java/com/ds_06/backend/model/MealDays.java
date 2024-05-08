package com.ds_06.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Data
@AllArgsConstructor
public class MealDays {
    private int mealDayNo;
    private String breakfast;
    private String lunch;
    private String dinner;
    private String snacks;
    private String calories;
}
