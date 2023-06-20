package com.vpr33.videolibrary.model.studio;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class DetailedStudioMapper implements Function<Studio, DetailedStudio> {
    @Override
    public DetailedStudio apply(Studio studio) {
        return new DetailedStudio(studio.getId(), studio.getName(), studio.getDescription());
    }
}
