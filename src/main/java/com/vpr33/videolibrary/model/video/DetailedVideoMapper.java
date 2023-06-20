package com.vpr33.videolibrary.model.video;

import com.vpr33.videolibrary.model.genre.PreviewGenreMapper;
import com.vpr33.videolibrary.model.studio.PreviewStudioMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DetailedVideoMapper implements Function<Video, DetailedVideo> {
    private final PreviewGenreMapper previewGenreMapper;
    private final PreviewStudioMapper previewStudioMapper;
    @Override
    public DetailedVideo apply(Video video) {
        return new DetailedVideo(video.getId(), video.getType(), video.getName(), video.getDescription(),
                video.getRating(), video.getImage(), video.getEpisodes(), previewStudioMapper.apply(video.getStudio()), video.getGenres().stream().map(previewGenreMapper).collect(Collectors.toSet()));
    }
}
