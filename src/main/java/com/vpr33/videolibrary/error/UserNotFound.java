package com.vpr33.videolibrary.error;

public class UserNotFound extends ResourceNotFound {
    public UserNotFound() {
    }

    public UserNotFound(String username) {
        super(username);
    }
}
