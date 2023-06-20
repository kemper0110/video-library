package com.vpr33.videolibrary.auth;


import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class AuthFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager manager;
    private final JWTUtils jwtUtils;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        log.info("Username: {}, password: {}", username, password);
        return manager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException {
        final var user = (UserDetailsX) authResult.getPrincipal();

        log.info("Username: {} successfully logged in.", user.getUsername());
        response.addCookie(jwtUtils.getAccessToken(user, request.getRequestURL().toString()));
        response.addCookie(jwtUtils.getRefreshToken(user, request.getRequestURL().toString()));
        response.sendRedirect("/auth");
    }
}
