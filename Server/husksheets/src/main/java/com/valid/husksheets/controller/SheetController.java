package com.valid.husksheets.controller;

// import com.valid.Argument;
// import com.valid.husksheets.Result;
// import com.valid.husksheets.service.SheetService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
//all endpoints start with /api/v1
@RequestMapping("/api/v1")
public class SheetController {

    @Autowired
    private SheetService sheetService;

    @PostMapping("/createSheet")
    //the argument contains the name of the sheet to create and name of client
    public Result createSheet(@RequestBody Argument argument) {
        //should contain the faliure msg
        String message;
        //the data for an update
        String value; 

        boolean success = sheetService.createSheet(argument.getPublisher(), argument.getSheet(), message, value);
        if (success) {
            return new Result(success, null, value);
        } else {
            return new Result(success, message, null);
        }
    }

//no value is returned? should these be void?
    @PostMapping("/deleteSheet")
    public Result deleteSheet(@RequestBody Argument argument) {
        //should contain the faliure msg
        String message;
        //the data for an update
        String value; 

        boolean success = sheetService.deleteSheet(argument.getPublisher(), argument.getSheet(), message, value);
        if (success) {
            return new Result(success, null, value);
        } else {
            return new Result(success, message, null);
        }
    }
}
