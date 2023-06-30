package com.vpr33.videolibrary.service;


import com.vpr33.videolibrary.error.StatusNotFound;
import com.vpr33.videolibrary.error.VideoNotFound;
import com.vpr33.videolibrary.model.status.Status;
import com.vpr33.videolibrary.repository.StatusRepository;
import com.vpr33.videolibrary.repository.UserRepository;
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
    private final UserRepository userRepository;

    public List<Status> getAll(Long user_id) {
        return statusRepository.findAllByUserFetch(user_id);
    }

    public Status getOne(Long user_id, Long video_id) throws StatusNotFound {
        return statusRepository.findByVideoIdAndUserId(video_id, user_id)
                .orElseThrow(() -> new StatusNotFound(video_id, user_id));
    }

    public Status add(Long user_id, Long video_id) throws VideoNotFound {
        final var video = videoRepository.getReferenceById(video_id);
        final var user = userRepository.getReferenceById(user_id);
        final var status = new Status(video, user);
        return statusRepository.save(status);
    }

    public void delete(Long user_id, Long video_id) throws VideoNotFound {
        statusRepository.removeByVideoIdAndUserId(video_id, user_id);
    }

    public Status changeState(Long user_id, Long video_id, Status.State state) throws StatusNotFound {
        final var status = getStatus(video_id, user_id);
        status.setState(state);
        return statusRepository.save(status);
    }

    public void setState(Long user_id, Long video_id, Status.State state) {
        final var video = videoRepository.getReferenceById(video_id);
        final var user = userRepository.getReferenceById(user_id);
        final var status = new Status(video, user, 0.0, 0, state);
        statusRepository.save(status);
    }

    public void setRating(Long user_id, Long video_id, Double rating) throws StatusNotFound {
        final var status = getStatus(video_id, user_id);
        status.setRating(rating);
        statusRepository.save(status);
    }

    public void setEpisodes(Long user_id, Long video_id, Integer episodes) throws StatusNotFound {
        final var status = getStatus(video_id, user_id);
        status.setEpisodes(episodes);
        statusRepository.save(status);
    }

    protected Status getStatus(Long video_id, Long user_id) throws StatusNotFound {
        return statusRepository.findByVideoIdAndUserId(video_id, user_id)
                .orElseThrow(() -> new StatusNotFound(video_id, user_id));
    }
}
