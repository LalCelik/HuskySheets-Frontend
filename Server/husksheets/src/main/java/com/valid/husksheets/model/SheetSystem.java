package com.valid.husksheets.model;
import java.util.ArrayList;
import java.util.List;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import com.google.gson.Gson;


public class SheetSystem {
    private List<Sheet> sheets;

    public SheetSystem() {
        this.sheets = new ArrayList<>();
    }

    public SheetSystem(List<Sheet> newSheets) {
        this.sheets = newSheets;
    }

    public SheetSystem(Sheet newSheet) {
        this.sheets = new ArrayList<>();
        sheets = readSheets();
        sheets.add(newSheet);
        //sheets.add(newSheet);
    }

    public List<Sheet> getSheets() {
        return sheets;
    }

    private List<Sheet> readSheets() {
        try {
            String jsonString = Files.readString(Path.of("src/main/resources/sheets.json"));
            SheetSystem sheetSystem = new Gson().fromJson(jsonString, SheetSystem.class);
            return sheetSystem.getSheets();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}