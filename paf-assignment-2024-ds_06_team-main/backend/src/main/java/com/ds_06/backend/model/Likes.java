package com.ds_06.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "likes")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Likes {


    @Id
    private String likeId;
    private String postId;
    private String userId;
}
