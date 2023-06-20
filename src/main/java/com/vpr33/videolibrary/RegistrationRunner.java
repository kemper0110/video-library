package com.vpr33.videolibrary;

import com.vpr33.videolibrary.model.user.Role;
import com.vpr33.videolibrary.model.user.User;
import com.vpr33.videolibrary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@RequiredArgsConstructor
@Component
public class RegistrationRunner implements CommandLineRunner {
    final UserRepository userRepository;
    final PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
//        if (userRepository.findByUsername("aboba").isEmpty())
//            userRepository.save(new User(null, "aboba", encoder.encode("1234"), Role.ROLE_MODERATOR));
//        if(userRepository.findByUsername("userboba").isEmpty())
//            userRepository.save(new User(null, "userboba", encoder.encode("1234"), Role.ROLE_USER));
//
    }
}
