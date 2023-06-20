package com.vpr33.videolibrary.error;

public class VideoNotFound extends ResourceNotFound {
    public VideoNotFound() {
    }

    public VideoNotFound(Long video_id) {
        super(video_id.toString());
    }
}
