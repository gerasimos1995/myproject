package com.example.myproject.model;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Table(name = "users_table",uniqueConstraints ={ @UniqueConstraint(columnNames = "Username"),@UniqueConstraint(columnNames = "Email") })
public class User {

    @Id
    @GeneratedValue
    @Column(name = "UserId",nullable = false)
    private int userId;

    @Column(name = "Username",nullable = false, unique = true)
    private String username;

    @Column(name = "Password",nullable = false)
    private String password;

    @Email
    @Column(name = "Email",nullable = false, unique = true)
    private String email;

    @Column(name = "Address")
    private String address;

    public User() {
    }

    public User(int userId, String username, String password, @Email String email, String address) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.address = address;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
