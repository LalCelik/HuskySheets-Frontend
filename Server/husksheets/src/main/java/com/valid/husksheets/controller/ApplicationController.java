package com.valid.husksheets.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.valid.husksheets.JSON.UserArgument;
import com.valid.husksheets.model.*;

import com.valid.husksheets.JSON.Result;
import com.valid.husksheets.JSON.Argument;

import com.valid.husksheets.model.User;
import com.valid.husksheets.model.UserSystem;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

/**
 * Controls REST api calls
 */
@RestController
@RequestMapping("api/v1")
public class ApplicationController {
    @Autowired
    private SheetService sheetService;

    @Autowired
    private UserSystem userSystem;

    /**
     * Receives username and password and tries to add new user to the UserSystem
     * Only this endpoint is open to public
     * Owner: Victoria and Sunkwan
     * @param userArgument which holds username and password
     * @return Result object which could succeed or fail
     */
    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result register(@RequestBody UserArgument userArgument) {
        if (userArgument.getUsername() == null || userArgument.getPassword() == null) {
            message = "Username and Password cannot be null";
            return new Result(false, message, null);
        }
        else {
            try {
                // Encrypt using Bcrypt
                String password = new BCryptPasswordEncoder().encode(userArgument.getPassword());
                userSystem.addUser(new User(
                        userArgument.getUsername(),
                        password,
                        new ArrayList<>()));
            } catch (IllegalArgumentException iae) {
                return new Result(false, "User already exists, please try again.", null);
            }
        }
        return new Result(true, "Successfully registered a user", null);
    }
    private String message;

    /**
     * Returns all Users in the UserSystem
     * Owner: Sunkwan
     * @return Result object that has list of Users
     */
    @GetMapping("/getPublishers")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result getPublishers() {
        System.out.println("Received getPublishers request");
        boolean success = true; // For testing purposes, always return true

        return new Result(success, "Getting all Publishers", userSystem.getPublishers());
    }

    /**
     * Create a sheet based on the given argument
     * Owner: Lal
     * @param argument object that has the name of the publisher and the sheet
     * @return Result of the process
     */
    @PostMapping("/createSheet")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result createSheet(Authentication authentication, Principal principal, @RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            message = "Publisher or sheetName can't be null";
            return new Result(false, message, null);
        } else if (!argument.getPublisher().equals(authentication.getName()) && !argument.getPublisher().equals(principal.getName())) {
            return new Result(false, "Illegal request: Can't create sheet for different publisher", null);
        } else {
            List<Update> updates = new ArrayList<>();
            Update update = new Update(STATUS.PUBLISHED, 0, "");
            updates.add(update);

            message = sheetService.createSheet(argument.getPublisher(), argument.getName(), updates);
            if (message.equals("success")) {
                return new Result(true, "Sheet has been created", null);
            } else {
                return new Result(false, message, null);
            }
        }
    }

    //no value is returned? should these be void?
    /**
     * Deletes the given Sheet based on the argument
     * Owner: Lal
     * @param argument object that has the name of the publisher and the sheet
     * @return Result of the process
     */
    @DeleteMapping("/deleteSheet")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result deleteSheet(Authentication authentication, Principal principal, @RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            message = "Publisher or sheetName can't be null";
            return new Result(false, message, null);
        } else if (!authentication.getName().equals(argument.getPublisher()) && !principal.getName().equals(argument.getPublisher())) {
            return new Result(false, "You don't have access to this request", null);
        } else {
            message = sheetService.deleteSheet(argument.getPublisher(), argument.getName());
            if (message.equals("success")) {
                return new Result(true, "Sheet has been deleted", null);
            } else {
                return new Result(false, message, null);
            }
        }
    }

    /**
     * Get sheets by the given Publisher
     * Owner: Lal
     * @param argument object which has the Publisher's name
     * @return Result of the process
     */
    @GetMapping("/getSheets")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result getSheets(@RequestBody Argument argument) {
        if (argument.getPublisher() == null) {
            return new Result(false, "Publisher can't be null", null);
        } else {
            SheetDao sheetDao = new SheetDao();
            try {
                List<Sheet> list = sheetDao.getSheets(argument.getPublisher());
                List<Argument> arguments = new ArrayList<>();
                for (Sheet sheet : list) {
                    arguments.add(new Argument(sheet.getPublisher(), sheet.getName(), null, null));
                }
                return new Result(true, "Outputting sheets in the system:", arguments);
            } catch (Exception e) {
                message = "Sheet couldn't be deleted: " + e.getMessage();
                return new Result(false, message, null);
            }
        }
    }

    private Result filterGetSheet(String publisher, String name, STATUS state, int above) throws IOException {
        SheetDao sheetDao = new SheetDao();
        Sheet sheet = sheetDao.getSheet(publisher, name);

        if (sheet == null) {
            return new Result(false, "No updates found", null);
        }

        List<Update> pendingUpdates = new ArrayList<>();

        int lastID = 0;

        for (Update u : sheet.getUpdates()) {
            if (u.getStatus() == state) {
                if (u.getId() > lastID) {
                    lastID = u.getId();
                }
                if (u.getId() > above) {
                    pendingUpdates.add(u);
                }
            }
        }

        if (pendingUpdates.isEmpty()) {
            return new Result(false, "No new pending updates", null);
        }

        Gson gson = new GsonBuilder().create();
        String payload = gson.toJson(pendingUpdates);

        List<Argument> arguments = new ArrayList<>();
        arguments.add(new Argument(publisher, name, lastID, payload));

        return new Result(true, "Getting updates", arguments);
    }

    @GetMapping("/getUpdatesForPublished")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result getUpdatesForPublished(Authentication authentication, Principal principal, @RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            return new Result(false, "Publisher or sheetName can't be null", null);
        } else if (!authentication.getName().equals(argument.getPublisher()) && !principal.getName().equals(argument.getPublisher())) {
            return new Result(false, "You don't have access to this request", null);
        } else {
            try {
                return filterGetSheet(argument.getPublisher(), argument.getName(), STATUS.REQUESTED, argument.getId());
            } catch (Exception e) {
                message = "Couldn't get the sheet updates: " + e.getMessage();
                return new Result(false, message, null);
            }
        }
    }

    @GetMapping("/getUpdatesForSubscription")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result getUpdatesForSubscription(@RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            return new Result(false, "Publisher or sheetName can't be null", null);
        } else {
            try {
                return filterGetSheet(argument.getPublisher(), argument.getName(), STATUS.PUBLISHED, argument.getId());
            } catch (Exception e) {
                message = "Couldn't get the sheet updates: " + e.getMessage();
                return new Result(false, message, null);
            }
        }
    }

    @PostMapping("/updatePublished")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result updatePublished(Authentication authentication, @RequestBody Argument argument) {

        if (argument.getPublisher() == null || argument.getName() == null) {
            return new Result(false, "Publisher or sheetName can't be null", null);
        } else if (!authentication.getName().equals(argument.getPublisher())) {
            return new Result(false, "You don't have access to this request", null);
        } else {
            SheetDao sheetDao = new SheetDao();
            Sheet sheet = sheetDao.getSheet(argument.getPublisher(), argument.getName());
            int lastID = sheet.getLastUpdateId();
            lastID++;

            Update newUpdate = new Update(STATUS.PUBLISHED, lastID, argument.getPayload());
            sheet.addUpdate(newUpdate);
            if(sheetDao.updateFile(sheet, newUpdate)) {
                return new Result(true, "Updated published", null);
            } else {
                return new Result(false, "Couldn't update Publisher", null);  
            }
        }
    }

    @PostMapping("/updateSubscription")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result updateSubscription(Authentication authentication, @RequestBody Argument argument) {

        if (argument.getPublisher() == null || argument.getName() == null) {
            return new Result(false, "Publisher or sheetName can't be null", null);
        } else if (authentication.getName().equals(argument.getPublisher())) {
            return new Result(false, "You don't have access to this request. You are the publisher.", null);
        } else {
            SheetDao sheetDao = new SheetDao();
            Sheet sheet = sheetDao.getSheet(argument.getPublisher(), argument.getName());
            int lastID = sheet.getLastUpdateId();
            lastID++;

            Update newUpdate = new Update(STATUS.REQUESTED, lastID, argument.getPayload());
            sheet.addUpdate(newUpdate);
            if(sheetDao.updateFile(sheet, newUpdate)) {
                return new Result(true, "Updated published", null);
            } else {
                return new Result(false, "Couldn't update Publisher", null);  
            }
        }
    }
}