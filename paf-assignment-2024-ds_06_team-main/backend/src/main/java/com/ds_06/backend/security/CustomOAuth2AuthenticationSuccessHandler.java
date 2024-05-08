package com.ds_06.backend.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;


import com.ds_06.backend.model.User;
import com.ds_06.backend.repository.UserRepository;
import com.ds_06.backend.service.JwtService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomOAuth2AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,HttpServletResponse response,Authentication authentication) throws IOException, 
    ServletException 
    {
        // this.setAlwaysUseDefaultTargetUrl(true);
        // this.setDefaultTargetUrl("http://localhost:3000/login");
        // super.onAuthenticationSuccess(request, response, authentication);

        if(authentication instanceof OAuth2AuthenticationToken)
        {
           OAuth2User oauth2User = ((OAuth2AuthenticationToken) authentication).getPrincipal();
           User user = userRepository.findByEmail(oauth2User.getAttribute("email").toString()).orElse(null);
            if(user!=null){
                System.out.println("customer exist");
                String token = jwtService.generateToken(user);
                //more process you have to do in your logic
                response.getWriter().write(token);
                response.getWriter().flush();

            }else{
               
                //customer doesn't exist, throw an error or create new one
            }
        }else{
          
        }

       }
    }

