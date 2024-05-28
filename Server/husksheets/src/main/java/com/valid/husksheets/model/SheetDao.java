package com.valid.husksheets.model;

import com.valid.husksheets.model.SheetSystem;
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
import com.google.gson.Gson;

public class SheetDao {
     
    
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
    
    
    // // File paths
    //  private final String FILE_PATH = "src/main/resources/sheets.json";
    //  private ObjectMapper objectMapper = new ObjectMapper();
    //  List<Sheet> sheetList;

    //  public SheetDao(ObjectMapper objectMapper) {
    //     this.objectMapper = objectMapper;
    //     sheetList = new ArrayList<>();
    //     //sheetList = readSheets();
    // }

    // private List<Sheet> readSheets() {
    //     List<Sheet> sheets = new ArrayList<>();
    //     File file = new File(FILE_PATH);
    //     if (file.exists()) {
    //         try (FileReader fileReader = new FileReader(file)) {
    //             sheets = objectMapper.readValue(fileReader, new TypeReference<List<Sheet>>() {});
    //         } catch (IOException e) {
    //             e.printStackTrace();
    //         }
    //     }
    //     return sheets;
    // }

    // private List<Sheet> readSheet() {
    //     try {
    //         String jsonString = Files.readString(Path.of(FILE_PATH));
    //         SheetSystem sheetSystem = new Gson().fromJson(jsonString, SheetSystem.class);
    //         return sheetSystem.getSheets();
    //     } catch (IOException e) {
    //         throw new RuntimeException(e);
    //     }
    // }

    // private boolean writeSheets(List<Sheet> sheets) {
    //     try {
    //         SheetSystem sheetSystem = new SheetSystem(sheets);
    //         String jsonOutput = new Gson().toJson(sheetSystem);
    //         Files.writeString(Path.of(FILE_PATH), jsonOutput);
    //         return true;
    //     } catch (IOException e) {
    //         e.printStackTrace();
    //         return false;
    //     }
    // }

    // // public boolean saveSheet2(Sheet sheet) {
    // //     //its reading empty
        
    // //     List<Sheet> newSet = readSheet();
    // //     newSet.add(sheet);
    // //     //clearFile(FILE_PATH);
        
    // //     if (writeSheets(newSet)) {
    // //         return true;
    // //     } else {
    // //         return false;
    // //     }
    // // }


    // //  public boolean saveSheet(Sheet sheet) {
    // //     //its reading empty
        
    // //     // List<Sheet> newSet = readSheets();
    // //     // newSet.add(sheet);
    // //     //clearFile(FILE_PATH);
    // //     sheetList.add(sheet);

    // //     try (FileWriter fileWriter = new FileWriter(FILE_PATH, true)) {
    // //         objectMapper.writeValue(fileWriter, sheetList);
    // //         return true;
    // //     } catch (IOException e) {
    // //         e.printStackTrace();
    // //         return false;
    // //     }
    // // }

    // public static void clearFile(String filePath) {
    //     try (FileWriter fileWriter = new FileWriter(filePath, false)) {
    //         fileWriter.write("");
    //     } catch (IOException e) {
    //         e.printStackTrace();
    //     }
    // }


}