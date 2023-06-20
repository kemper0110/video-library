package com.vpr33.videolibrary.model.video;

public record PreviewVideo(Long id, String name, String image, Double rating, Video.Type type, Long episodes) {
}
