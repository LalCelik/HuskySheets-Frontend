package com.valid.husksheets.model.FileUtils;

import com.google.gson.Gson;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import com.valid.husksheets.model.Sheet;
import com.valid.husksheets.model.Update;
import com.valid.husksheets.model.SheetSystem;

/**
 * FileUtils class specifically for Sheet
 * Owner: Lal
 */
public class SheetSystemUtils implements FileUtils<SheetSystem> {
    /**
     * Read the given file path and converts it to a SheetSystem
     * @param filePath String of path to read
     * @return SheetSystem from the data we got from the file
     * @throws IOException for any IO errors
     */
    @Override
    public SheetSystem readFromFile(String filePath) {
        try {
        String jsonString = Files.readString(Path.of(filePath));
        return new Gson().fromJson(jsonString, SheetSystem.class);
        } catch (IOException e) {
            return null;
        }
    }

    /**
     * Saves the SheetSystem into a Json file
     * @param sheetSystem for data that we want to write
     * @param filePath String of path to write
     * @throws IOException for any IO errors
     */
    @Override
    public void writeToFile(SheetSystem sheetSystem, String filePath) throws IOException {
        String jsonOutput = new Gson().toJson(sheetSystem);
        Files.writeString(Path.of(filePath), jsonOutput);
    }

    public void writeUpdateToFile(Sheet sheet, Update update, String filePath) throws IOException {
        String jsonString = Files.readString(Path.of(filePath));
        SheetSystem sheetSystem = new Gson().fromJson(jsonString, SheetSystem.class);
        sheetSystem.updateSystem(sheet, update);
        writeToFile(sheetSystem, filePath);
    }
}