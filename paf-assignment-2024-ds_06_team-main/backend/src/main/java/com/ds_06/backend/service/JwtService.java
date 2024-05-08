package com.ds_06.backend.service;
import java.util.Date;
import java.util.function.Function;
import java.util.HashMap;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class JwtService {

    private final SecretKey SECRET_KEY;

    public JwtService()
    {
        String secretString = "4eb7dbdcbf2d61ec9ad7de296a4a6fd41219502890bf44623720084450fc4a55";
        byte[] keyBytes = Base64.getDecoder().decode(secretString.getBytes(StandardCharsets.UTF_8));
        this.SECRET_KEY = new SecretKeySpec(keyBytes,"HmacSHA256");
    }

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isValid(String token, UserDetails userdetails){
        String user_name = extractUsername(token);
        return user_name.equals(userdetails.getUsername()) && !isTokenExpired(token);
    }


    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims,T> resolver){
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    // Here Claims means properties of the token such as expiry date
    private Claims extractAllClaims(String token)
    {
        return Jwts
                .parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(UserDetails userdetails)
    {
        String token = Jwts
                        .builder()
                        .subject(userdetails.getUsername())
                        .issuedAt(new Date(System.currentTimeMillis()))
                        .expiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
                        .signWith(SECRET_KEY)
                        .compact();

        return token;

    }

    public String generateRefreshToken(HashMap<String, Object> claims, UserDetails userdetails) {

        String token = Jwts
                        .builder()
                        .claims(claims)
                        .subject(userdetails.getUsername())
                        .issuedAt(new Date(System.currentTimeMillis()))
                        .expiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
                        .signWith(SECRET_KEY)
                        .compact();

        return token;
    }


}
