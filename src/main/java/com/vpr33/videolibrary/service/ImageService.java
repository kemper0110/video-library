package com.vpr33.videolibrary.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class ImageService {

    @Value("${file.directory}")
    String directory;

    public String storeFile(MultipartFile file) throws IOException {
        final var name = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        final var storage = Paths.get(directory).toAbsolutePath().normalize();
        final var target_location = storage.resolve(name);
        Files.copy(file.getInputStream(), target_location, StandardCopyOption.REPLACE_EXISTING);
        return name;
    }

    public Resource loadFileAsResource(String filename) throws MalformedURLException {
        final var storage = Paths.get(directory).toAbsolutePath().normalize();
        final var path = storage.resolve(filename).normalize();
        return new UrlResource(path.toUri());
    }
}
