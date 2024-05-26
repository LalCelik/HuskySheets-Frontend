package com.valid.husksheets.controller;

import com.valid.husksheets.model.SheetService;
import com.valid.husksheets.JSON.Result;
import com.valid.husksheets.JSON.Argument;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
//all endpoints start with /api/v1
@RequestMapping("/api/v1")
public class SheetController {

    @Autowired
    private SheetService sheetService;

    private List<Argument> value;

    private String message;

    @PostMapping("/createSheet")
    //the argument contains the name of the sheet to create and name of client
    public Result createSheet(@RequestBody Argument argument) {

        boolean success = sheetService.createSheet(argument.getPublisher(), message, value);
        if (success) {
            return new Result(success, null, value);
        } else {
            return new Result(success, message, null);
        }
    }

//no value is returned? should these be void?
    @PostMapping("/deleteSheet")
    public Result deleteSheet(@RequestBody Argument argument) {

        boolean success = sheetService.deleteSheet(argument.getPublisher(), argument.getSheet(), message, value);
        if (success) {
            return new Result(success, null, value);
        } else {
            return new Result(success, message, null);
        }
    }
}
