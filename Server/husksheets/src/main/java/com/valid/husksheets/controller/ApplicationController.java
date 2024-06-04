package com.valid.husksheets.controller;


import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.valid.husksheets.JSON.UserArgument;
import com.valid.husksheets.model.*;
import com.valid.husksheets.model.SheetService;
import com.valid.husksheets.model.SheetDao;
import com.valid.husksheets.model.Sheet;
import com.valid.husksheets.model.STATUS;
import com.valid.husksheets.model.Update;
import com.valid.husksheets.model.FileUtils.SheetSystemUtils;

import com.valid.husksheets.JSON.Result;
import com.valid.husksheets.JSON.Argument;

import com.valid.husksheets.model.User;
import com.valid.husksheets.model.UserSystem;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.StringWriter;
import java.io.Writer;
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
    public Result createSheet(@RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            message = "Publisher or sheetName can't be null";
            return new Result(false, message, null);
        } else {
            //temporary
            List<Update> updates = new ArrayList<>();
            Update update = new Update(STATUS.APPROVED, 0, argument.payload());
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
    @PostMapping("/deleteSheet")
    @CrossOrigin(origins = "http://localhost:3000")
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
            List<Sheet> list = new ArrayList<>();
            String value = "";
            try {
                list = sheetDao.getSheets(argument.getPublisher());
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

    @GetMapping("/getUpdatesForPublished")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result getUpdatesForPublished(Authentication authentication, Principal principal, @RequestBody Argument argument) {
        if (argument.getPublisher() == null || argument.getName() == null) {
            return new Result(false, "Publisher or sheetName can't be null", null);
        } else if (authentication.getName().equals(argument.getPublisher()) && principal.getName().equals(argument.getPublisher())) {
            return new Result(false, "You don't have access to this request", null);
        } else {
            SheetDao sheetDao = new SheetDao();
            try {
                Sheet sheet = sheetDao.getSheet(argument.getPublisher(), argument.getName());
                int last = 0;

                Writer writer = new StringWriter();
                Gson gson = new GsonBuilder().create();
                gson.toJson(sheet.getUpdates(), writer);

                return new Result(true, "Getting updates", null);
            } catch (Exception e) {
                message = "Sheet couldn't be loaded" + e.getMessage();
                return new Result(false, message, null);
            }
        }
    }

    // @PostMapping("/updatePublished")
    // @CrossOrigin(origins = "http://localhost:3000")
    // public Result updatePublished(@RequestBody Argument argument) {
    //     //get last id of updates and add more to it 
    //     //get the sheet publisher and name to find it
    //     SheetDao sheetDao = new SheetDao();
    //     try  {
    //          Sheet sheet = sheetDao.getSheet(argument.getPublisher(), argument.getName());
    //         // //check the id of update
    //          int lastID = sheet.getLastUpdateId();
    //          lastID++;
    //          Update newUpdate = new Update(STATUS.APPROVED, lastID, argument.getPayload());
    //         // sheet.addUpdates(newUpdate);

    //         // SheetSystemUtils sheetSystemUtils = new SheetSystemUtils();
    //         // sheetSystemUtils.readFromFile("src/main/resources/sheets.json");

    //         // sheetSystemUtils.writeUpdateToFile(sheet, newUpdate, "src/main/resources/sheets.json");
    //         // return new Result(true, "aaaaaaa", null); 

    //          SheetSystemUtils sheetSystemUtils = new SheetSystemUtils();
    //          sheetSystemUtils.writeUpdateToFile(argument.getName(), argument.getPublisher(), newUpdate, "src/main/resources/sheets.json");
    //          return new Result(true, "aaaaaaa", null); 

    //     } catch (IOException e) {
    //         message = "Sheet couldn't be found: " + e.getMessage();
    //         return new Result(false, message, null); 
    //     }
    // }

    @PostMapping("/updatePublished")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result updatePublished(@RequestBody Argument argument) {
        //get last id of updates and add more to it 
        //get the sheet publisher and name to find it
        SheetDao sheetDao = new SheetDao();
        try  {
             Sheet sheet = sheetDao.getSheet(argument.getPublisher(), argument.getName());
             int lastID = sheet.getLastUpdateId();
             lastID++;
             Update newUpdate = new Update(STATUS.APPROVED, lastID, argument.getPayload());
             sheet.addUpdate(newUpdate);
            String message = sheetDao.updateFileUpdate(sheet, newUpdate);
            if(message.equals("success")) {
                return new Result(true, message, null);
            } else {
                return new Result(false, message, null);
            }
        } catch (IOException e) {
            message = "Sheet couldn't be found: " + e.getMessage();
            return new Result(false, message, null); 
        }

    }

    @PostMapping("/updateSubscription")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result updateSubscription(@RequestBody Argument argument) {
        //get last id of updates and add more to it 
        //get the sheet publisher and name to find it
        SheetDao sheetDao = new SheetDao();
        try  {
             Sheet sheet = sheetDao.getSheet(argument.getPublisher(), argument.getName());
             int lastID = sheet.getLastUpdateId();
             lastID++;
             Update newUpdate = new Update(STATUS.PENDING, lastID, argument.getPayload());
             sheet.addUpdate(newUpdate);
            String message = sheetDao.updateFileUpdate(sheet, newUpdate);
            if(message.equals("success")) {
                return new Result(true, message, null);
            } else {
                return new Result(false, message, null);
            }
        } catch (IOException e) {
            message = "Sheet couldn't be found: " + e.getMessage();
            return new Result(false, message, null); 
        }

    }

    //for published its published
    //check if theyre the publisher
    //for subscription 

    //updatePublished then authentication.getName is get publisher
    //pub is PUBLISHED 

    //updateSubscription authentication.getName is NOT getpublisher
    //sub is a REQUEST
}