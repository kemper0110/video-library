package com.vpr33.videolibrary.error;

public class StatusNotFound extends ResourceNotFound {
    public StatusNotFound() {
    }

    public StatusNotFound(Long video_id, Long user_id) {
        super("video:%s user:%s".formatted(video_id, user_id));
    }
}
