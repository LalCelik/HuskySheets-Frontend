package com.valid.husksheets.model;

/**
 * An Update made to a sheet
 * Owner: Sunkwan and Lal
 */
public class Update {
    private final STATUS status;
    private final int id;
    private String update;

    /**
     * Update for a sheet
     * @param status Status of the update depending on the user
     * @param id id of the update
     * @param update value of the update
     */
    public Update(STATUS status, int id, String update) {
        this.status = status;
        this.id = id;
        this.update = update;
    }

    /**
     * Gets id of the update
     * @return the id of the update
     */
    public int getId() {
        return id;
    }

    /**
     * Gets status of the update
     * @return the status of the update
     */
    public STATUS getStatus() {
        return status;
    }

     /**
     * Gets content of the update
     * @return the content of the update
     */
    public String getUpdate() {
        return update;
    }

    /**
     * Sets content of an Update to the given content
     * @param update value to change
     */
    public void setUpdate(String update) {
        this.update = update;
    }
}
