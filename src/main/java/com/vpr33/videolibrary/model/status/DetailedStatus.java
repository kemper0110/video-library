package com.vpr33.videolibrary.model.status;

import com.vpr33.videolibrary.model.video.Video;

public record DetailedStatus(
        Double rating, Integer episodes, Status.State state, Long video_id,
        String video_name, Long video_episodes, Video.Type video_type
) {
}
