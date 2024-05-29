package com.valid.husksheets.model.FileUtils;

import com.google.gson.Gson;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import com.valid.husksheets.model.SheetSystem;

public class SheetSystemUtils implements FileUtils<SheetSystem> {
    @Override
    public SheetSystem readFromFile(String filePath) throws IOException {
        String jsonString = Files.readString(Path.of(filePath));
        return new Gson().fromJson(jsonString, SheetSystem.class);
    }

    @Override
    public void writeToFile(SheetSystem sheetSystem, String filePath) throws IOException {
        String jsonOutput = new Gson().toJson(sheetSystem);
        Files.writeString(Path.of(filePath), jsonOutput);
    }
}