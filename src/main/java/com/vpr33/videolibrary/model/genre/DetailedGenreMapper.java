package com.vpr33.videolibrary.model.genre;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class DetailedGenreMapper implements Function<Genre, DetailedGenre> {
    @Override
    public DetailedGenre apply(Genre genre) {
        return new DetailedGenre(genre.getId(), genre.getName(), genre.getDescription());
    }
}
