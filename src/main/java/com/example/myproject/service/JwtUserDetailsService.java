package com.example.myproject.service;

import java.util.ArrayList;
import java.util.Optional;

import com.example.myproject.model.User;
import com.example.myproject.dao.UserDAO;
import com.example.myproject.web.JwtAuthenticationAPI;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    Logger logger = LoggerFactory.getLogger(JwtUserDetailsService.class);

    @Autowired
    UserDAO userDAO;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userDAO.findUserByUsername(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.get().getUsername(), user.get().getPassword(),
                new ArrayList<>());
    }

    public User save(User user) {
        logger.info("User received in save function is:" + user.toString());
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        try {
            newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        }catch (NullPointerException ex){
            logger.error("Error: " + ex.getMessage());
            newUser.setPassword(bcryptEncoder.encode("makis5"));
        }
        newUser.setEmail(user.getEmail());
        return userDAO.save(newUser);
    }
}
