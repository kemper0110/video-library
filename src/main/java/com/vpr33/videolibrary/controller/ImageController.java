package com.vpr33.videolibrary.controller;


import com.vpr33.videolibrary.repository.VideoRepository;
import com.vpr33.videolibrary.service.ImageService;
import com.vpr33.videolibrary.service.VideoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@RestController
@RequestMapping("/image")
public class ImageController {

    private final ImageService imageService;
    private final VideoService videoService;

    @GetMapping("/{name}")
    public ResponseEntity<Resource> getImage(@PathVariable String name, HttpServletRequest request) throws IOException {
        final var resource = imageService.loadFileAsResource(name);
        String content_type = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(1, TimeUnit.HOURS).cachePublic().mustRevalidate())
                .lastModified(resource.lastModified())
                .contentType(MediaType.parseMediaType(content_type))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }


    @PreAuthorize("isAuthenticated() && hasRole('MODERATOR')")
    @PostMapping
    public void uploadImage(@RequestParam("file") MultipartFile file, @RequestParam Long video_id) throws IOException {
        final var filename = imageService.storeFile(file);
        videoService.setImagePath(video_id, filename);
    }

}
