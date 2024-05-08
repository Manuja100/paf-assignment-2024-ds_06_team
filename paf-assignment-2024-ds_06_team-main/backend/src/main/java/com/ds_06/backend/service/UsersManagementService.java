package com.ds_06.backend.service;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ds_06.backend.dao.ReqRes;
import com.ds_06.backend.model.User;
import com.ds_06.backend.model.UserH;
import com.ds_06.backend.repository.UserRepository;

@Service
public class UsersManagementService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;


//function that runs when user tries to register
public ReqRes register(ReqRes registrationRequest)
{
    ReqRes resp = new ReqRes();

    try{
        User user = new User();
        user.setUsername(registrationRequest.getUsername());
        user.setFirstname(registrationRequest.getFirstname());
        user.setLastname(registrationRequest.getLastname());
        user.setEmail(registrationRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setProfilepic(registrationRequest.getProfilepic());
        user.setContactnumber(registrationRequest.getContactnumber());
        user.setCity(registrationRequest.getCity());
        user.setGender(registrationRequest.getGender());
        user.setBirthdate(registrationRequest.getBirthdate());
        user.setRole("ADMIN");

        User newuser = userRepository.save(user);

        if(newuser.getUsername() != null)
        {
           UserH newuserH = new UserH();
           newuserH.set_id(newuser.get_id());
           newuserH.setUsername(newuser.getUsername());
           newuserH.setFirstname(newuser.getFirstname());
           newuserH.setLastname(newuser.getLastname());
           newuserH.setEmail(newuser.getEmail());
           newuserH.setPassword(newuser.getPassword());
           newuserH.setContactnumber(newuser.getContactnumber());
           newuserH.setCity(newuser.getCity());
           newuserH.setRole("ADMIN");

           resp.setUserH((newuserH));
           resp.setMessage("User Saved Successfully");
           resp.setStatusCode(200); 
        }

    }
    catch(Exception e){
        resp.setStatusCode(500);
        resp.setError(e.getMessage());
    }   

    return resp;
}

    //function that runs when a user tries to login
    public ReqRes login(ReqRes loginRequest)
    {
        ReqRes response = new ReqRes();

        try{

            authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            var user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
            var jwt = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);


            response.setId(user.get_id());
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");

        }
        catch(Exception e){
            response.setUsername(loginRequest.getUsername());
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;

    }

    // function to generate refresh token
    public ReqRes refreshToken(ReqRes refreshTokenRequest)
    {
        ReqRes response = new ReqRes();

        try{

            String user_name = jwtService.extractUsername(refreshTokenRequest.getToken());
            User user = userRepository.findByUsername(user_name).orElseThrow();

            if(jwtService.isValid(refreshTokenRequest.getToken(),user))
            {
                var jwt = jwtService.generateToken(user);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hrs");
                response.setMessage("Successfully Logged In");
            }

            response.setStatusCode(200);
            return response;
        }
        catch(Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }

    }

    //function to update user details
    public ReqRes updateUser(User updatedUser)
    {
        ReqRes reqRes = new ReqRes();
        
        try
        {
            Optional<User> userOptional = userRepository.findByUsername(updatedUser.getUsername());

            if(userOptional.isPresent())
            {
                User existingUser = userOptional.get();
                existingUser.setFirstname(updatedUser.getFirstname());
                existingUser.setLastname(updatedUser.getLastname());
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setContactnumber(updatedUser.getContactnumber());
                existingUser.setCity(updatedUser.getCity());
                existingUser.setBirthdate(updatedUser.getBirthdate());

                if(updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty())
                {
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));  
                }

                User savedUser = userRepository.save(existingUser);
                reqRes.setUser(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            }
            else
            {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
                
            }

        }
        catch(Exception e)
        {
            reqRes.setStatusCode(500);
            reqRes.setMessage(e.getMessage());
        }
       
        return reqRes;
    }

    public ReqRes deleteUser(String userId)
    {

        ReqRes reqRes = new ReqRes();
        userRepository.deleteById(userId);

        reqRes.setStatusCode(200);
        reqRes.setMessage("Deleted Successfully");

        return reqRes;
    }

    // public ReqRes resetPassword(String oldPassword, String currentPassword, String newPassword)
    // {
    //     String encodedCurrentPassword = passwordEncoder.encode(currentPassword);
    //     ReqRes res = new ReqRes();

    //     if (encodedCurrentPassword == oldPassword)
    //     {
    //         res.setStatusCode(401);
    //         res.setMessage("Your new password is same as your current password");
    //     }
    //     else
    //     {
            
    //     }
    // }

}
