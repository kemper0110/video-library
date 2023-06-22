package com.vpr33.videolibrary.model.status;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class PreviewStatusMapper implements Function<Status, PreviewStatus> {
    @Override
    public PreviewStatus apply(Status status) {
        return new PreviewStatus(status.getRating(), status.getEpisodes(), status.getState(), status.getVideo().getId());
    }
}
