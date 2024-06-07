package com.valid.husksheets.model.FileUtils;
import java.io.IOException;

/**
 * Utils class for handling file reading and writing
 * Owner: Lal
 * @param <T> data object that we want to read to or write from
 */
public interface FileUtils<T> {
    /**
     * Read the data from the given filePath
     * @param filePath String of path to read
     * @return Data that it read from the file path
     * @throws IOException for IO errors
     */
    T readFromFile(String filePath) throws IOException;

    /**
     * Write the given data to a file path specified
     * @param data for data that we want to write
     * @param filePath String of path to write
     * @throws IOException for IO errors
     */
    void writeToFile(T data, String filePath) throws IOException;
}