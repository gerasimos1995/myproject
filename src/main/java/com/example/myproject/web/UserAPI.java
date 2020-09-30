package com.example.myproject.web;

import com.example.myproject.dao.UserDAO;
import com.example.myproject.model.User;

import jdk.nashorn.internal.objects.NativeJSON;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/users")
public class UserAPI {

    Logger logger = LoggerFactory.getLogger(UserAPI.class);

    @Autowired
    private UserDAO userDao;

    @GetMapping("/")
    public List<User> getUsers(){
        logger.info("Requested all users");
        return (List<User>) userDao.findAll();
    }

    //With basic exception handling
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public User addUser(@RequestBody User user){
        logger.info(String.format("Create User: %s", user));
        try {
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            return userDao.save(user);
        } catch (DataIntegrityViolationException ex) {
            logger.error(ex.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    ex.getMessage()
            );
        }
    }

    @GetMapping("/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public Optional<User> getUser(@PathVariable("id") Integer userId){
        logger.info("Requested specific user");
        Optional<User> user = userDao.findById(userId);
        if (!user.isPresent()){
            String message = String.format("User %s not found!", userId);
            logger.error(message);
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    message
            );
        }

        return user;
    }

    @PutMapping("/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public User updateUser(@PathVariable("id") Integer userId, @RequestBody User user){
        logger.info(String.format("Requested update user %s", userId));
        Optional<User> updateUser = userDao.findById(userId);
        if (!updateUser.isPresent()){
            String message = String.format("User %s not found!", userId);
            logger.error(message);
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    message
            );
        }
        try {
            logger.info(String.format("Update user: %s", user));
            user.setUserId(updateUser.get().getUserId());
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            return userDao.save(user);
        } catch (DataIntegrityViolationException ex){
            String message = "Username or Email already exists";
            logger.error(message);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    message
            );
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable("id") Integer userId){
        logger.info(String.format("Request to delete user: %s", userId));
        try {
            userDao.deleteById(userId);
            logger.info(String.format("Deleted user: %s", userId));
        } catch (EmptyResultDataAccessException ex){
            String message = String.format("User %s not found!", userId);
            logger.error(message);
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    message
            );
        }

    }
}
