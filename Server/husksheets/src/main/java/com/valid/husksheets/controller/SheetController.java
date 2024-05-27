package com.valid.husksheets.controller;

import com.valid.husksheets.model.SheetService;


import com.valid.husksheets.JSON.Result;
import com.valid.husksheets.JSON.Argument;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;


import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class SheetController {

    @Autowired
    private SheetService sheetService;

    //private List<Argument> value = new ArrayList<>();

    private String message;

    @PostMapping("/createSheet")
    public Result createSheet(@RequestBody Argument argument) {
        boolean success = sheetService.createSheet(argument.getPublisher(), argument.getName(), message);
        if (success) {
            return new Result(success, null, null);
        } else {
            return new Result(success, message, null);
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
        boolean success = sheetService.createSheet(argument.getPublisher(), argument.getName(), message);
        if (success) {
            return new Result(success, null, null);
        } else {
            return new Result(success, message, null);
        }
    }
}
