package com.ds_06.backend.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Document(collection = "meal")
public class Meal {
    @Id
    private String mealId;

    @Field(targetType = FieldType.OBJECT_ID)
    private String userID;
    private String mealType;
    private String days;
    private String description;
    private List<MealDays> mealdays;

}
