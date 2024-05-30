package com.valid.husksheets.controller;

import com.google.gson.Gson;
import com.valid.husksheets.JSON.UserArgument;
import com.valid.husksheets.model.SheetService;
import com.valid.husksheets.model.SheetDao;
import com.valid.husksheets.model.Sheet;

import com.valid.husksheets.JSON.Result;
import com.valid.husksheets.JSON.Argument;

import com.valid.husksheets.model.User;
import com.valid.husksheets.model.UserSystem;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1")
public class ApplicationController {
    @Autowired
    private SheetService sheetService;

    @Autowired
    private UserSystem userSystem;

    // Only this endpoint is open to public
    // Owner: Victoria & Sunkwan
    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result register(@RequestBody UserArgument userArgument) {
        if (userArgument.getUsername() == null || userArgument.getPassword() == null) {
            message = "Username and Password cannot be null";
            return new Result(false, message, null);
        }
        else {
            try {
                String password = new BCryptPasswordEncoder().encode(userArgument.getPassword());
                userSystem.addUser(new User(
                        userArgument.getUsername(),
                        password,
                        new ArrayList<Integer>()));
            } catch (IllegalArgumentException iae) {
                return new Result(false, "User already exists, please try again.", null);
            }
        }
        return new Result(true, "Successfully registered a user", null);
    }
    private String message;

    // Getting all users from the database
    // Owner: Sunkwan
    @GetMapping("/getPublishers")
    public Result getPublishers() throws IOException {
        System.out.println("Received getPublishers request");
        boolean success = true; // For testing purposes, always return true

        return new Result(success, "Getting all Publishers", userSystem.getPublishers());
    }

    @PostMapping("/createSheet")
    public Result createSheet(@RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            message = "Publisher or sheetName can't be null";
            return new Result(false, message, null);
        } else {
            message = sheetService.createSheet(argument.getPublisher(), argument.getName());
            if (message.equals("success")) {
                return new Result(true, "Sheet has been created", null);
            } else {
                return new Result(false, message, null);
            }
        }
    }

    //no value is returned? should these be void?
    @PostMapping("/deleteSheet")
    public Result deleteSheet(@RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            message = "Publisher or sheetName can't be null";
            return new Result(false, message, null);
        } else {
            message = sheetService.deleteSheet(argument.getPublisher(), argument.getName());
            if (message.equals("success")) {
                return new Result(true, "Sheet has been deleted", null);
            } else {
                return new Result(false, message, null);
            }
        }
    }

    @PostMapping("/getSheets")
    public Result getSheets(@RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            return new Result(false, "Publisher or sheetName can't be null", null);
        } else {
            SheetDao sheetDao = new SheetDao();
            List<Sheet> list = new ArrayList<>();
            String value = "";
            try {
                list = sheetDao.getSheets(argument.getPublisher());
                message = list.toString();
                return new Result(true, message, null);
            } catch (Exception e) {
                message = "Sheet couldn't be deleted: " + e.getMessage();
                return new Result(false, message, null);
            }
        }
    }
}