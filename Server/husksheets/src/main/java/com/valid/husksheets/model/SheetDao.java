package com.valid.husksheets.model;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SheetDao {
     // File paths
     private final String SHEETS_FILE = "src/main/resources/sheets.json";
     //private final String USERS_FILE = "users.json";
 
     // ObjectMapper for JSON serialization/deserialization
     private ObjectMapper objectMapper = new ObjectMapper();

     public SheetDao(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

     public boolean saveSheet(Sheet sheet) {

        try (FileWriter fileWriter = new FileWriter(SHEETS_FILE, true)) {
            objectMapper.writeValue(fileWriter, sheet);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

    }

    // public List<Sheet> loadSheets() {
    //     try (FileReader fileReader = new FileReader(SHEETS_FILE)) {
    //         return objectMapper.readValue(fileReader, new TypeReference<List<Sheet>>() {});
    //     } catch (IOException e) {
    //         e.printStackTrace();
    //     }
    //     return new ArrayList<>();
    // }

}