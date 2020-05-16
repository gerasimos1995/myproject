package com.example.myproject.web;

import com.example.myproject.dao.UserDAO;
import com.example.myproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserAPI {

    @Autowired
    private UserDAO userDao;

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public User addUser(@RequestBody User user){
        return userDao.save(user);
    }

    @GetMapping("/")
    public List<User> getUsers(){
        return (List<User>) userDao.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable("id") Integer userId){
        return userDao.findById(userId);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable("id") Integer userId, @RequestBody User user){
        Optional<User> updateUser = userDao.findById(userId);
        user.setUserId(updateUser.get().getUserId());
        return userDao.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Integer userId){
        userDao.deleteById(userId);
    }
}
