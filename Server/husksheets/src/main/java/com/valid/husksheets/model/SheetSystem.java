package com.valid.husksheets.model;
import java.util.ArrayList;
import java.util.List;

import java.io.IOException;
import java.nio.file.Path;
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

    public List<Sheet> getSheets() {
        return sheets;
    }

    public void setSheets(List<Sheet> newSheets) {
        sheets = newSheets;
    }

    public void addSheet(Sheet sheet) {
        sheets.add(sheet);
    }

    // public boolean deleteSheet(Sheet sheet) {
    //     boolean deleted = false;
    //     for(Sheet s: sheets) {
    //         if(s != null) {
    //             if((s.getName().equals(sheet.getName()))) {
    //                 sheets.remove(s);
    //                 deleted = true;
    //                 break;
    //             }
    //         }
    //     }
    //     return deleted;
    // }
}