package com.valid.husksheets;
import com.valid.husksheets.model.User;
import com.valid.husksheets.JSON.Argument;
import com.valid.husksheets.model.UserSystem;
import com.valid.husksheets.model.Sheet;
import com.valid.husksheets.JSON.Result;
import com.valid.husksheets.controller.ApplicationController;
import org.springframework.security.core.Authentication;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import com.google.gson.Gson;
import com.valid.husksheets.model.SheetSystem;
import com.valid.husksheets.model.Update;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.valid.husksheets.model.SheetDao;
import com.valid.husksheets.model.SheetService;

import java.util.ArrayList;
import java.util.List;


import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ApplicationControllerTest {
    //path working
    private String path = "src/main/resources/sheetsTest.json";
    SheetDao sheetDao = new SheetDao(path);
    SheetService sheetService = new SheetService(path);
    ApplicationController appControl = new ApplicationController(sheetDao, sheetService);
    SheetSystem sheetSystem = new SheetSystem();

    //mockito usage?
    @Test
    void createSheetTest() {
        // try {
        // String jsonString = Files.readString(Path.of(path));
        // sheetSystem = new Gson().fromJson(jsonString, SheetSystem.class);
        // } catch (IOException e) {
        //     e.printStackTrace();
        // }

        Argument argumentExisting = new Argument("user1", "Example1", 0, "Update");
        Argument argument4 = new Argument("user4", "name", 0, "Update");

        Result resultSuccess = new Result(true, "Sheet has been created", null);
        Result resultDiffPublisher = new Result(false, "Illegal request: Can't create sheet for different publisher", null);

        //Initialzing Security
        //Makes a list of Authority
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        //Mock authentication with user4
        Authentication authentication = new UsernamePasswordAuthenticationToken("user4", "password", authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
      
        //Add more tests here:
        //Trying to create a sheet for a different publisher
        assertEquals(appControl.createSheet(authentication, argumentExisting), resultDiffPublisher);
        //Succesfully creating a sheet
        assertEquals(appControl.createSheet(authentication, argument4), resultSuccess);

    
        SecurityContextHolder.clearContext();
    }
}
