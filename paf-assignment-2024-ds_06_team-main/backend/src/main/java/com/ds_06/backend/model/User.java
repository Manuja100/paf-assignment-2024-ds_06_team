package com.ds_06.backend.model;
import java.util.Collection;
import java.util.List;

import javax.persistence.Id;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "users") 
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails{

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
    private String birthdate;
    private String gender;
    private String role;

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }
    

    public String getUsername() {
        // TODO Auto-generated method stub
        return this.username;
    }
   

    public boolean isAccountNonExpired() {
        return true;
    }
   

    public boolean isAccountNonLocked() {
        return true;
    }


    public boolean isCredentialsNonExpired() {
       return true;
    }

    public boolean isEnabled() {
       return true;
    }

}
