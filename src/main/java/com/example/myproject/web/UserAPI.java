package com.example.myproject.web;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class UserAPI {

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

}
