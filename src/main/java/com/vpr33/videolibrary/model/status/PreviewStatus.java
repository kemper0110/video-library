package com.vpr33.videolibrary.model.status;

public record PreviewStatus(
        Double rating, Integer episodes, Status.State state, Long video_id
) {
}
