package com.example.myproject.web;

import com.example.myproject.dao.UserDAO;
import com.example.myproject.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.myproject.service.JwtUserDetailsService;

import com.example.myproject.config.JwtTokenUtil;
import org.springframework.web.server.ResponseStatusException;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class JwtAuthenticationAPI {

    Logger logger = LoggerFactory.getLogger(JwtAuthenticationAPI.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        //logger.info("Inside CreateAuthToken received request: " + authenticationRequest);
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);
        //logger.info("Inside CreateAuthToken the generated token is: " + token);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    //With basic exception handling
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> registerNewUser(@RequestBody SignupRequest user){
        logger.info(String.format("Requesting registration for user: " + user.toString()));
        if (userDAO.findUserByUsername(user.getUsername()).isPresent()){
            String message = "Username already exists";
            logger.error(message);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    message
            );
        }

        if (userDAO.findUserByEmail(user.getEmail()).isPresent()){
            String message = "Email already exists";
            logger.error(message);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    message
            );
        }

        User newUser = new User(user.getUsername(), user.getPassword(), user.getEmail());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        User savedUser = userDAO.save(newUser);
        return ResponseEntity.ok(new SignupResponse("User '" + savedUser.getUsername() +"' registered successfully!"));
    }


    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}