package com.vpr33.videolibrary.auth;

import com.vpr33.videolibrary.model.user.Role;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Component
@RequiredArgsConstructor
public class OnceAuthFilter extends OncePerRequestFilter {
    private final JWTUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        //  || request.getServletPath().startsWith("/shop/")
        if (!request.getServletPath().startsWith("/auth/")) {
            final var cookie = WebUtils.getCookie(request, jwtUtils.access_cookie_name);
            if (cookie != null) {
                String accessToken = cookie.getValue();
                var decodedJWT = jwtUtils.decode(accessToken);

                final var rights = Arrays.stream(decodedJWT.getClaim("rights").asArray(String.class)).map(SimpleGrantedAuthority::new).toList();
                final var user = new UserDetailsX(
                        decodedJWT.getClaim("userId").asLong(),
                        decodedJWT.getSubject(), "",
                        rights,
                        Role.valueOf(decodedJWT.getClaim("role").asString())
                );
                final var authToken = new UsernamePasswordAuthenticationToken(user, "", rights);
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}

