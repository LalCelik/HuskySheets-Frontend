package com.valid.husksheets;
import com.valid.husksheets.model.Sheet;
import com.valid.husksheets.controller.ApplicationController;
import org.junit.jupiter.api.Test;
import com.valid.husksheets.model.SheetSystem;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.valid.husksheets.model.SheetDao;
import com.valid.husksheets.model.SheetService;
import com.valid.husksheets.model.FileUtils.SheetSystemUtils;

import java.util.ArrayList;


import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SheetDaoTest {
    private String path = "src/main/resources/sheetsTest.json";
    SheetDao sheetDao = new SheetDao(path);
    SheetService sheetService = new SheetService(path);
    ApplicationController appControl = new ApplicationController(sheetDao, sheetService);
    SheetSystem sheetSystem = new SheetSystem();
    SheetSystemUtils utils = new SheetSystemUtils();

    @Test
    void getSheetTest() {
    SheetSystem sheetSystem = utils.readFromFile(path);   
    Sheet sheet = new Sheet("Example1", "user1", null, new ArrayList<>());
    Sheet nullSheet = null;

    //sheet is found
    assertEquals(sheetDao.getSheet("user1", "Example1").getName(), sheet.getName());
    assertEquals(sheetDao.getSheet("user2", "Example1"), null);
    }

    
}
