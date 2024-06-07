package com.valid.husksheets.model;

public class Update {
    private STATUS status;
    private int id;
    private String update;

    public Update(STATUS status, int id, String update) {
        this.status = status;
        this.id = id;
        this.update = update;
    }

    public int getId() {
        return id;
    }

    public STATUS getStatus() {
        return status;
    }

    public String getUpdate() {
        return update;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setStatus(STATUS status) {
        this.status = status;
    }

    public void setUpdate(String update) {
        this.update = update;
    }
}
