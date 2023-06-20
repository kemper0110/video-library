package com.vpr33.videolibrary.model.genre;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class PreviewGenreMapper implements Function<Genre, PreviewGenre> {
    @Override
    public PreviewGenre apply(Genre genre) {
        return new PreviewGenre(genre.getId(), genre.getName());
    }
}
