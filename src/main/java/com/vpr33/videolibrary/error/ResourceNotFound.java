package com.vpr33.videolibrary.error;

public class ResourceNotFound extends Exception {
    public ResourceNotFound() {
    }

    public ResourceNotFound(String message) {
        super(message);
    }
}
