package com.ds_06.backend.model;

import javax.persistence.Id;

import org.bson.types.ObjectId;
import org.springframework.hateoas.RepresentationModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserH extends RepresentationModel<UserH>{

    @Id
    private String _id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String profilepic;
    private String city;
    private String contactnumber;
    private String role;

}
