package com.valid.husksheets.model;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.nio.file.Files;
import java.util.List;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class SheetDao {
     // File paths
     private final String FILE_PATH = "src/main/resources/sheets.json";
     private ObjectMapper objectMapper = new ObjectMapper();
     List<Sheet> sheetList;

     public SheetDao(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        sheetList = readSheets();
    }

    private List<Sheet> readSheets() {
        List<Sheet> sheets = new ArrayList<>();
        File file = new File(FILE_PATH);
        if (file.exists()) {
            try (FileReader fileReader = new FileReader(file)) {
                sheets = objectMapper.readValue(fileReader, new TypeReference<List<Sheet>>() {});
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return sheets;
    }

     public boolean saveSheet(Sheet sheet) {
        //its reading empty
        
        List<Sheet> newSet = readSheets();
        newSet.add(sheet);
        //clearFile(FILE_PATH);

        try (FileWriter fileWriter = new FileWriter(FILE_PATH, true)) {
            objectMapper.writeValue(fileWriter, sheetList);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static void clearFile(String filePath) {
        try (FileWriter fileWriter = new FileWriter(filePath, false)) {
            fileWriter.write("");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}