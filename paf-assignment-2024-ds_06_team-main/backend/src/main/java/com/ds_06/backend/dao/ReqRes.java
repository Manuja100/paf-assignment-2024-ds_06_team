package com.ds_06.backend.dao;

import java.util.List;

import com.ds_06.backend.model.User;
import com.ds_06.backend.model.UserH;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private String id;
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String profilepic;
    private String city;
    private String contactnumber;
    private String role;
    private String gender;
    private String birthdate;
    private User user;
    private UserH userH;
    private List<User> users;
    
}
