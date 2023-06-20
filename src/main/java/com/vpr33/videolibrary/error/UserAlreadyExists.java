package com.vpr33.videolibrary.error;

public class UserAlreadyExists extends Exception {
    public UserAlreadyExists() {

    }
    public UserAlreadyExists(String message) {
        super(message);
    }
}
