package com.vpr33.videolibrary.model.studio;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class PreviewStudioMapper implements Function<Studio, PreviewStudio> {
    @Override
    public PreviewStudio apply(Studio studio) {
        return new PreviewStudio(studio.getId(), studio.getName());
    }
}
