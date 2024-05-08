package com.ds_06.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import javax.persistence.Id;
import java.util.Date;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;


@Data
@Document(collection = "workoutPlan")
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutPlan {
    
    //primary key
    @Id
    private String _id;

    //foreign key
    @Field(targetType = FieldType.OBJECT_ID)
    private String userID;
    private Date createdDate;
    private int split;
    private String name;

    //List variable for days refer Day.java class
    private List<Day> days;
}



