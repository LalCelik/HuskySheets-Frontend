package com.valid.husksheets.model;

    /**
     * An Update made to a sheet
     * Owner: Sunkwan and Lal
     */
public class Update {
    private STATUS status;
    private int id;
    private String update;

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
     * Sets current id of an Update to the given id
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Sets current status of an Update to the given status
     */
    public void setStatus(STATUS status) {
        this.status = status;
    }

    /**
     * Sets content id of an Update to the given content
     */
    public void setUpdate(String update) {
        this.update = update;
    }
}
