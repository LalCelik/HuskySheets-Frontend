package com.valid.husksheets.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class ApplicationController {
    // Only this endpoint is open to public
    @GetMapping("/register")
    public String register()
    {
        return "register";
    }


    @GetMapping("/secret")
    public String secret()
    {
        return "Hey! welcome to secret page";
    }

}