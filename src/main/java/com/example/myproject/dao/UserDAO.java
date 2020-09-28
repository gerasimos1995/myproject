package com.example.myproject.dao;

import com.example.myproject.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserDAO extends CrudRepository <User, Integer> {
    User findUserByUsername(String username);
}
