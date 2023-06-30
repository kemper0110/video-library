package com.vpr33.videolibrary.model.video;

import java.util.List;

public record UpdateVideoRequest(
        Long id, String name, Double rating,
        Long studio, Video.Type type,
        Long episodes, List<Long> genres,
        String description, String image
) {
}
