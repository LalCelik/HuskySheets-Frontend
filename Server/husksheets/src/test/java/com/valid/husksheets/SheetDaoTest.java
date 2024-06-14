package com.valid.husksheets;
import com.valid.husksheets.model.*;
import com.valid.husksheets.controller.ApplicationController;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.nio.file.Files;
import java.nio.file.Path;

import com.valid.husksheets.model.FileUtils.SheetSystemUtils;
import java.io.IOException;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.*;


import java.util.ArrayList;

import org.springframework.boot.test.context.SpringBootTest;

    /**
     * Tests for SheetDao functions
     */
@SpringBootTest
public class SheetDaoTest {
    private String path = "src/main/resources/sheetsTest.json";
    SheetDao sheetDao = new SheetDao(path);
    SheetService sheetService = new SheetService(path);
    UserSystem userSystemTest = new UserSystem("src/main/java/com/valid/husksheets/db/systemTest.json");
    ApplicationController appControl = new ApplicationController(sheetDao, sheetService, userSystemTest);
    SheetSystem sheetSystem = new SheetSystem();
    SheetSystemUtils utils = new SheetSystemUtils();

    /**
     * Tests for getSheet function
     */
    @Test
    void getSheetTest() {
    Sheet sheet = new Sheet("Example1", "user1", new ArrayList<>());

    //sheet is found
    assertEquals(sheetDao.getSheet("user1", "Example1").getName(), sheet.getName());
    assertNull(sheetDao.getSheet("user2", "Example1"));
    }

    /**
     * Tests for saveSheet function
     */
    @Test
    void saveSheetTest() {
        SheetSystem sheetSystemOriginal = utils.readFromFile(path);   
        SheetSystem sheetSystem = utils.readFromFile(path);   

        try {

        Sheet sheet = new Sheet("Example2", "user1", new ArrayList<>());
        boolean saved = sheetDao.saveSheet(sheet);

        // Check if the sheet was saved successfully
        assertTrue(saved);
        sheetSystem = utils.readFromFile(path);
        assertTrue(sheetDao.sheetExists(sheetSystem, sheet));

        // Attempt to save the same sheet again
        boolean savedAgain = sheetDao.saveSheet(sheet);
        assertFalse(savedAgain);

        //No file for given sheet path
        String newPath = "src/main/resources/sheetsNewTest.json";
        SheetDao sheetDaoPath = new SheetDao(newPath);
        sheetDaoPath.saveSheet(sheet);
        assertTrue(Files.exists(Path.of(newPath)));
        Files.delete(Path.of(newPath));

    } catch (IOException e) {
        fail("IOException occurred while saving the sheet: " + e.getMessage());
    }

        // Reset the testing JSON
        try {
            utils.writeToFile(sheetSystemOriginal, path);
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
