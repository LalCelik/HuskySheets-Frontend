package com.valid.husksheets.model;
import java.util.ArrayList;
import java.util.List;


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
}

