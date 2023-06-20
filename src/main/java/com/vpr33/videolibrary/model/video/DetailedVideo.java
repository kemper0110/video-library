package com.vpr33.videolibrary.model.video;

import com.vpr33.videolibrary.model.genre.PreviewGenre;
import com.vpr33.videolibrary.model.studio.PreviewStudio;

import java.util.Set;

public record DetailedVideo(Long id, Video.Type type, String name,
                            String description, Double rating, String image,
                            Long episodes, PreviewStudio studio, Set<PreviewGenre> genres) {
}
