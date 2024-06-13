package com.valid.husksheets.controller;

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
    private UserSystem userSystem = new UserSystem();

    private final SheetDao sheetDao;

    /**
     * Instantiates Application controller with new Sheet systems
     */
    public ApplicationController() {
        sheetService = new SheetService();
        sheetDao = new SheetDao();
    }

    /**
     * Instantiates Application controller with given Sheet systems
     * @param sheetDaoNew SheetDao to configure
     * @param sheetServiceNew SheetService to configure
     */
    public ApplicationController(SheetDao sheetDaoNew, SheetService sheetServiceNew) {
        sheetDao = sheetDaoNew;
        sheetService = sheetServiceNew;
    }

    /**
     * Receives username and password and tries to add new user to the UserSystem
     * Only this endpoint is open to public
     * Owner: Victoria and Sunkwan
     * @param userArgument which holds username and password
     * @return Result object which could succeed or fail
     */
    @PostMapping("/registerUser")
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

    /**
     * Receives username and password and tries to delte user from the UserSystem
     * Owner: Lal
     * @param userArgument which holds username and password
     * @return Result object which could succeed or fail
     */
    @PostMapping("/deleteUser")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result deleteUser(@RequestBody UserArgument userArgument) {
        if (userArgument.getUsername() == null) {
            String message = "Username cannot be null";
            return new Result(false, message, null);
        } else {
            try {
                // Check if user exists in database
                User userExists = userSystem.findByUsername(userArgument.getUsername());
                if (!(userExists == null)) {
                    // Delete the user logic here
                    userSystem.deleteUser(userExists);
                    return new Result(true, "User deleted successfully", null);
                } else {
                    return new Result(false, "User does not exist", null);
                }
            } catch (Exception e) {
                return new Result(false, "Error deleteing User: " + e.getMessage(), null);
            }
        }
    }

    /**
     * Checks whether authentication works. Also, triggers the User to be a publisher
     * @param authentication Authentication of the logged-in user
     * @return Result object which could succeed or fail
     */
    @GetMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result register(Authentication authentication) {
        userSystem.register(authentication.getName());
        return new Result(true,  null, null);
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
     * @param authentication Authentication of the logged-in user
     * @param argument object that has the name of the publisher and the sheet
     * @return Result of the process
     */
    @PostMapping("/createSheet")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result createSheet(Authentication authentication, @RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            message = "Publisher or sheetName can't be null";
            return new Result(false, message, null);
        } else if (!argument.getPublisher().equals(authentication.getName())) {
            return new Result(false, "Illegal request: Can't create sheet for different publisher", null);
        } else {
            List<Update> updates = new ArrayList<>();
            Update update = new Update(STATUS.PUBLISHED, 0, argument.getPayload());
            updates.add(update);

            if (sheetService.createSheet(argument.getPublisher(), argument.getName(), updates)) {
                return new Result(true, "Sheet has been created", null);
            } else {
                return new Result(false, "Sheet couldn't be created", null);
            }
        }
    }

    //no value is returned? should these be void?
    /**
     * Deletes the given Sheet based on the argument
     * Owner: Lal
     * @param authentication Authentication of the logged-in user
     * @param argument object that has the name of the publisher and the sheet
     * @return Result of the process
     */
    @PostMapping("/deleteSheet")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result deleteSheet(Authentication authentication, @RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            return new Result(false, "Publisher or sheetName can't be null", null);
        } else if (!authentication.getName().equals(argument.getPublisher())) {
            return new Result(false, "You don't have access to this request", null);
        } else {
            if (sheetService.deleteSheet(argument.getPublisher(), argument.getName())) {
                return new Result(true, "Sheet has been deleted", null);
            } else {
                return new Result(false, "Sheet couldn't be deleted", null);
            }
        }
    }

    /**
     * Get sheets by the given Publisher
     * Owner: Lal
     * @param argument object which has the Publisher's name
     * @return Result of the process
     */
    @PostMapping("/getSheets")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result getSheets(@RequestBody Argument argument) {
        if (argument.getPublisher() == null) {
            return new Result(false, "Publisher can't be null", null);
        } else {
            //SheetDao sheetDao = new SheetDao();
            try {

                if (userSystem.findByUsername(argument.getPublisher()) == null) {
                    return new Result(false,
                            "Publisher not found", null);
                }

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

    private Result filterGetSheet(String publisher, String name, STATUS state, int above) {
        Sheet sheet = sheetDao.getSheet(publisher, name);

        if (sheet == null) {
            return new Result(false, "No sheet found", null);
        }

        StringBuilder result = new StringBuilder();
        int lastID = 0;

        for (Update u : sheet.getUpdates()) {
            if (u.getStatus() == state) {
                if (u.getId() > lastID) {
                    lastID = u.getId();
                }
                if (u.getId() > above) {
                    result.append(u.getUpdate());
                }
            }
        }

        if (result.toString().isEmpty()) {
            List<Argument> noUpdate = new ArrayList<>();
            noUpdate.add(new Argument(publisher, name, above, ""));
            return new Result(true, "Getting updates: No updates found", noUpdate);
        }

        List<Argument> arguments = new ArrayList<>();
        arguments.add(new Argument(publisher, name, lastID, result.toString()));

        return new Result(true, "Getting updates", arguments);
    }

    /**
     * Get all the Requested updates of the given sheet by the user starting from the update id provided.
     * Owner: Sunkwan
     * @param authentication Authentication of logged-in user
     * @param argument which holds publisher name and id
     * @return Result object which could succeed or fail
     */
    @PostMapping("/getUpdatesForPublished")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result getUpdatesForPublished(Authentication authentication, @RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            return new Result(false, "Publisher or sheetName can't be null", null);
        } else if (!authentication.getName().equals(argument.getPublisher())) {
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

    /**
     * Get all the Published updates of the given sheet by the user starting from the update id provided.
     * Owner: Sunkwan
     * @param argument which holds publisher name and id
     * @return Result object which could succeed or fail
     */
    @PostMapping("/getUpdatesForSubscription")
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

    /**
     * Receives an argument with the publisher name and payload
     * Adds a PUBLISHED update to the sheet with the given name and publisher 
     * The payload is the content of the update and the update is made by publisher
     * Owner: Lal
     * @param argument which holds publisher name and payload
     * @param authentication Authentication of the logged-in user
     * @return Result object which could succeed or fail
     */
    @PostMapping("/updatePublished")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result updatePublished(@RequestBody Argument argument, Authentication authentication) {

        if (argument.getPublisher() == null || argument.getName() == null) {
            return new Result(false, "Publisher or sheetName can't be null", null);
        } else if (!authentication.getName().equals(argument.getPublisher())) {
            return new Result(false, "You don't have access to this request", null);
        } else {
            Sheet sheet = sheetDao.getSheet(argument.getPublisher(), argument.getName());
            if(sheet == null) {
                return new Result(false, "There is no such sheet, couldn't update", null);  
            } else {
            int lastID = sheet.getLastUpdateId();
            lastID++;

            Update newUpdate = new Update(STATUS.PUBLISHED, lastID, argument.getPayload());
            sheet.addUpdate(newUpdate);
            if(sheetDao.updateFile(sheet, newUpdate)) {
                return new Result(true, "Update published", null);
            } else {
                return new Result(false, "Couldn't update Publisher", null);  
            }
        }
        }
    }

    /**
     * Receives an argument with the publisher name and payload
     * Adds a REQUESTED update to the sheet with the given name and publisher 
     * The payload is the content of the update and the update are made by a subscriber
     * Owner: Lal
     * @param argument which holds publisher name and payload
     * @param authentication Authentication of the logged-in user
     * @return Result object which could succeed or fail
     */
    @PostMapping("/updateSubscription")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result updateSubscription(Authentication authentication, @RequestBody Argument argument) {

        if (argument.getPublisher() == null || argument.getName() == null) {
            return new Result(false, "Publisher or sheetName can't be null", null);
        } else if (authentication.getName().equals(argument.getPublisher())) {
            return new Result(false, "You don't have access to this request. You are the publisher.", null);
        } else {
            Sheet sheet = sheetDao.getSheet(argument.getPublisher(), argument.getName());
            if(sheet == null) {
                return new Result(false, "There is no such sheet, couldn't update", null);  
            } else {
            int lastID = sheet.getLastUpdateId();
            lastID++;

            Update newUpdate = new Update(STATUS.REQUESTED, lastID, argument.getPayload());
            sheet.addUpdate(newUpdate);
            if(sheetDao.updateFile(sheet, newUpdate)) {
                return new Result(true, "Update published", null);
            } else {
                return new Result(false, "Couldn't update Publisher", null);  
            }
        }
        }
    }
}