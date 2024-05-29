package com.valid.husksheets.model.FileUtils;
import java.io.IOException;

public interface FileUtils<T> {
    T readFromFile(String filePath) throws IOException;
    void writeToFile(T data, String filePath) throws IOException;
}
