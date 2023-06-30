package com.vpr33.videolibrary.model.status;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class DetailedStatusMapper implements Function<Status, DetailedStatus> {
    @Override
    public DetailedStatus apply(Status status) {
        final var video = status.getVideo();
        return new DetailedStatus(status.getRating(), status.getEpisodes(), status.getState(),
                status.getVideo().getId(),
                video.getName(), video.getEpisodes(), video.getType()
        );
    }
}
