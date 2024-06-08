package com.valid.husksheets;
<<<<<<< HEAD

import org.junit.jupiter.api.Test;
=======
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
import com.valid.husksheets.model.Sheet;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.valid.husksheets.model.SheetDao;
import com.valid.husksheets.model.SheetService;
import com.valid.husksheets.model.FileUtils.SheetSystemUtils;

import java.util.ArrayList;
import java.util.List;


>>>>>>> bcea8081d2601a7c22294dc894ab014f89d59a02
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ApplicationControllerTest {
<<<<<<< HEAD
=======
    private String path = "src/main/resources/sheetsTest.json";
    SheetDao sheetDao = new SheetDao(path);
    SheetService sheetService = new SheetService(path);
    ApplicationController appControl = new ApplicationController(sheetDao, sheetService);
    SheetSystem sheetSystem = new SheetSystem();
    SheetSystemUtils utils = new SheetSystemUtils();

    @Test
    void createSheetTest() {
        SheetSystem sheetSystemOrginal = utils.readFromFile(path);
        SheetSystem sheetSystem = utils.readFromFile(path);
        assertEquals(sheetSystem.getSheets().size(), 1);
        assertEquals(sheetSystem.getSheets().get(0).getName(), "Example1");

        Argument argumentExisting = new Argument("user1", "Example1", 0, "");
        Argument argument4 = new Argument("user4", "name", 0, "");

        Result resultSuccess = new Result(true, "Sheet has been created", null);
        Result resultDiffPublisher = new Result(false, "Illegal request: Can't create sheet for different publisher", null);
        Authentication authentication = new UsernamePasswordAuthenticationToken("user4", "password");
      
        //Add more tests here:
        //Trying to create a sheet for a different publisher
        assertEquals(appControl.createSheet(authentication, argumentExisting), resultDiffPublisher);
        assertEquals(sheetSystem.containsSheet(new Sheet("name", "user4", new ArrayList<>())), false);

        //Succesfully creating a sheet
        assertEquals(appControl.createSheet(authentication, argument4), resultSuccess);
        sheetSystem = utils.readFromFile(path);

        assertEquals(sheetSystem.getSheets().size(), 2);
        assertEquals(sheetSystem.containsSheet(new Sheet("name", "user4", new ArrayList<>())), true);

        //reset the testing JSON
        try {
        utils.writeToFile(sheetSystemOrginal, path);
        } catch (IOException e) {
          throw new RuntimeException(e.getMessage());
        }

    }
>>>>>>> bcea8081d2601a7c22294dc894ab014f89d59a02
}
