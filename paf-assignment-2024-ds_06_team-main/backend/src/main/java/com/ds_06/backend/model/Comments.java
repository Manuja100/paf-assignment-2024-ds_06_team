package com.ds_06.backend.model;


import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "comments")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Comments {


    @Id

private String postId;
private String userId;
private int severity;
private String description;
private Date createdDate;


}