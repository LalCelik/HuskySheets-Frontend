package com.valid.husksheets.controller;

import com.google.gson.Gson;
import com.valid.husksheets.model.SheetService;

import com.valid.husksheets.JSON.Result;
import com.valid.husksheets.JSON.Argument;

import com.valid.husksheets.model.User;
import com.valid.husksheets.model.UserSystem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;

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
    @PostMapping("/register")
    public Result register(@RequestBody Argument argument)
    {
        // TODO
        userSystem.addUser(new User(3, "user4", "$2a$10$BezvAEoJKUHvpklxHnzqK.ralY2l99EEp1QvJUgrGxsRFazAKYtWi", new ArrayList<>()));
        return new Result(true, "Successfully registered a user", null);
    }


    @GetMapping("/secret")
    public String secret()
    {
        return "Hey! welcome to secret page";
    }

    private String message;

    // Getting all users from the database
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

    //shows up with the json
    @GetMapping("/testCreateSheet")
    public Result testCreateSheet() {
        System.out.println("Received testCreateSheet request");
        boolean success = true; // For testing purposes, always return true

        // Populate the value list with sample data
        List<Argument> sampleArguments = new ArrayList<>();
        sampleArguments.add(new Argument("SamplePublisher1", "SampleSheet1", 1, "SamplePayload1"));

        return new Result(success, "This is a test message", sampleArguments);
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
}