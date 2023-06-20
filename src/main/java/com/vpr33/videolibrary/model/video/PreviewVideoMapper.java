package com.vpr33.videolibrary.model.video;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class PreviewVideoMapper implements Function<Video, PreviewVideo> {
    @Override
    public PreviewVideo apply(Video video) {
        return new PreviewVideo(video.getId(), video.getName(), video.getImage(), video.getRating(), video.getType(), video.getEpisodes());
    }
}
