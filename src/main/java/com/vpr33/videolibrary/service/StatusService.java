package com.vpr33.videolibrary.service;


import com.vpr33.videolibrary.error.StatusNotFound;
import com.vpr33.videolibrary.error.VideoNotFound;
import com.vpr33.videolibrary.model.Status;
import com.vpr33.videolibrary.model.user.User;
import com.vpr33.videolibrary.repository.StatusRepository;
import com.vpr33.videolibrary.repository.VideoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class StatusService {
    private final StatusRepository statusRepository;
    private final VideoRepository videoRepository;

    public List<Status> getAll(User user) {
        return statusRepository.findAllByUser(user);
    }

    public Status getOne(User user, Long video_id) throws VideoNotFound, StatusNotFound {
        // TODO: check getReference possibility
        final var video = videoRepository.findById(video_id).orElseThrow(() -> new VideoNotFound(video_id));
        return statusRepository.findByVideoAndUser(video, user).orElseThrow(() -> new StatusNotFound(video_id, user.getId()));
    }

    public Status add(User user, Long video_id) throws VideoNotFound {
        // TODO: check getReference possibility
        final var video = videoRepository.findById(video_id).orElseThrow(() -> new VideoNotFound(video_id));
        final var status = new Status(video, user);
        return statusRepository.save(status);
    }

    public void delete(User user, Long video_id) throws VideoNotFound {
        // TODO: check getReference possibility
        final var video = videoRepository.findById(video_id).orElseThrow(() -> new VideoNotFound(video_id));
        statusRepository.removeByVideoAndUser(video, user);
    }

    public Status changeState(User user, Long video_id, Status.State state) throws VideoNotFound, StatusNotFound {
        final var status = getStatus(video_id, user);
        status.setState(state);
        return statusRepository.save(status);
    }

    public void setState(User user, Long video_id, Status.State state) throws VideoNotFound {
        // TODO: check getReference possibility
        final var video = videoRepository.findById(video_id).orElseThrow(() -> new VideoNotFound(video_id));
        final var status = new Status(video, user, 0.0, 0, state);
        statusRepository.save(status);
    }

    public void setRating(User user, Long video_id, Double rating) throws VideoNotFound, StatusNotFound {
        final var status = getStatus(video_id, user);
        status.setRating(rating);
        statusRepository.save(status);
    }

    public void setEpisodes(User user, Long video_id, Integer episodes) throws VideoNotFound, StatusNotFound {
        final var status = getStatus(video_id, user);
        status.setEpisodes(episodes);
        statusRepository.save(status);
    }

    protected Status getStatus(Long video_id, User user) throws VideoNotFound, StatusNotFound {
        // TODO: check getReference possibility
        final var video = videoRepository.findById(video_id).orElseThrow(() -> new VideoNotFound(video_id));
        return statusRepository.findByVideoAndUser(video, user).orElseThrow(() -> new StatusNotFound(video_id, user.getId()));
    }
}
