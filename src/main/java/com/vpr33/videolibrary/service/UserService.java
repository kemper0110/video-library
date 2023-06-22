package com.vpr33.videolibrary.service;

import com.vpr33.videolibrary.auth.RoleProvider;
import com.vpr33.videolibrary.auth.UserDetailsX;
import com.vpr33.videolibrary.error.PasswordException;
import com.vpr33.videolibrary.error.UserAlreadyExists;
import com.vpr33.videolibrary.error.UserNotFound;
import com.vpr33.videolibrary.model.user.Role;
import com.vpr33.videolibrary.model.user.User;
import com.vpr33.videolibrary.model.user.UserInfo;
import com.vpr33.videolibrary.model.user.UserInfoMapper;
import com.vpr33.videolibrary.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.util.List;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleProvider roleProvider;
    private final PasswordEncoder passwordEncoder;
    private final UserInfoMapper userInfoMapper;

    public UserDetailsX getPrincipal(Authentication authentication) {
        return (UserDetailsX) authentication.getPrincipal();
    }

    public User getUserByAuthentication(Authentication authentication) throws UserNotFound {
        final var principal = getPrincipal(authentication);
        return userRepository.findById(principal.getId()).orElseThrow(() -> new UserNotFound(principal.getUsername()));
    }

    public Stream<UserInfo> getAllUsers() {
        return userRepository.findAll().stream().map(userInfoMapper);
    }

    public void save(String username, String password) throws LoginException, PasswordException, UserAlreadyExists {
        if (!username.matches("^[A-Za-z0-9]{3,16}$"))
            throw new LoginException("Логин должен состоять от 3 до 16 букв или цифр");
        if (!password.matches("^[A-Za-z0-9]{3,16}$"))
            throw new PasswordException("Пароль должен состоять от 3 до 16 букв или цифр");
        final var userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent())
            throw new UserAlreadyExists();
        final var user = new User(null, username, passwordEncoder.encode(password), Role.ROLE_USER);
        userRepository.save(user);
    }

    public UserInfo findUserInfoByUsername(String username) throws UserNotFound {
        final var user = userRepository.getByUsername(username).orElseThrow(() -> new UserNotFound(username));
        return new UserInfo(user.getId(), user.getUsername(), user.getRole());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        final var rights = roleProvider.getRightsByRole(user.getRole());

        return new UserDetailsX(
                user.getId(), user.getUsername(),
                user.getPassword(), rights, user.getRole()
        );
    }
}

