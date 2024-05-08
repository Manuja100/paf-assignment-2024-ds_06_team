package com.ds_06.backend.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ds_06.backend.service.JwtService;
import com.ds_06.backend.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthFilter extends OncePerRequestFilter{

    @Autowired
    private JwtService jwtservice;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
      
      final String authHeader = request.getHeader("Authorization");
      final String jwtToken;
      final String userName;
      
      if(authHeader == null || authHeader.isBlank()){
        filterChain.doFilter(request, response);
        return;
      }

      jwtToken = authHeader.substring(7);
      userName = jwtservice.extractUsername(jwtToken);
    

    if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null){
        UserDetails userdetails = userService.loadUserByUsername(userName);

        if(jwtservice.isValid(jwtToken, userdetails)){
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            UsernamePasswordAuthenticationToken token  = new UsernamePasswordAuthenticationToken(
                userdetails, null, userdetails.getAuthorities()
            );
            token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            securityContext.setAuthentication(token);
            SecurityContextHolder.setContext(securityContext);
        }

    }

    filterChain.doFilter(request, response);

}

}