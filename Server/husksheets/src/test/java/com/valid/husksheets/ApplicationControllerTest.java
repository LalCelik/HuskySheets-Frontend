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
    private String path = "src/main/resources/sheetsTest.json";
    SheetDao sheetDao = new SheetDao(path);
    SheetService sheetService = new SheetService(path);
    ApplicationController appControl = new ApplicationController(sheetDao, sheetService);

    @Test
    void createSheetTest() {

        Argument argumentExisting = new Argument("user1", "Example1", 0, "Update");
        Argument argument4 = new Argument("user4", "name", 0, "Update");

        Result resultSuccess = new Result(true, "Sheet has been created", null);
        Result resultDiffPublisher = new Result(false, "Illegal request: Can't create sheet for different publisher", null);

        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        Authentication authentication = new UsernamePasswordAuthenticationToken("user4", "password", authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Your test code goes here
        // Example:
        assertEquals(appControl.createSheet(authentication, argumentExisting), resultDiffPublisher);
        assertEquals(appControl.createSheet(authentication, argument4), resultSuccess);

        // Clear the security context after the test
        SecurityContextHolder.clearContext();
    }
}
