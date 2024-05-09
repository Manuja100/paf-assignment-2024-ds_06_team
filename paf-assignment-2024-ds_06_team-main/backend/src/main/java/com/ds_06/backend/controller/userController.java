package com.ds_06.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import com.ds_06.backend.dao.ReqRes;
import com.ds_06.backend.model.User;
import com.ds_06.backend.model.UserH;
import com.ds_06.backend.service.UserService;
import com.ds_06.backend.service.UsersManagementService;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/users")
public class userController {

    @Autowired
    private UserService userService;
    @Autowired
    private UsersManagementService usersManagementService;

    @GetMapping("")
    public ResponseEntity<List<User>> getUsers(){
        
        return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable String userId){
        
        return new ResponseEntity<Optional<User>>(userService.getUser(userId), HttpStatus.OK);
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<UserDetails> getUserByUsername(@PathVariable String username) {
        UserDetails user =  userService.loadUserByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public EntityModel<ReqRes> register(@RequestBody ReqRes reg) {

        ReqRes res = usersManagementService.register(reg);
        
        return EntityModel.of(res,
        linkTo(methodOn(userController.class).login(reg)).withRel("users"));

    }

    @PostMapping("/login")
    public EntityModel<ReqRes> login(@RequestBody ReqRes reg) {

        ReqRes res = usersManagementService.login(reg);

        return EntityModel.of(res,
        linkTo(methodOn(userController.class).login(reg)).withSelfRel(),
        linkTo(methodOn(ImageController.class).getAllImages()).withRel("posts"));
        // return ResponseEntity.status(HttpStatus.OK).body(entityModel);

    }

    @PutMapping("")
    public EntityModel<ReqRes> updateUser(@RequestBody User user) {
    
        ReqRes res = usersManagementService.updateUser(user);
        
        return EntityModel.of(res,
        linkTo(methodOn(userController.class).updateUser(user)).withSelfRel(),
        linkTo(methodOn(userController.class).getUser(res.getUser().get_id())).withRel("users"));
    }

    @DeleteMapping("/{userId}")
    public EntityModel<ReqRes> deleteUser(@PathVariable String userId) {
    
        ReqRes res = usersManagementService.deleteUser(userId);
        
        return EntityModel.of(res,
        linkTo(methodOn(userController.class).getUsers()).withRel("users"));
    }
    


}
