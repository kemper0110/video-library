package com.vpr33.videolibrary.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

//import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class JWTUtils {
    private final Algorithm algorithm;

    @Value("${jwt.access_token_expiration}")
    public long access_token_expiration;
    @Value("${jwt.refresh_token_expiration}")
    public long refresh_token_expiration;

//    @Value("${spring.web.resources.static-locations}")
//    List<String> locations;
    @Value("${jwt.access_cookie_name}")
    public String access_cookie_name;

    @Value("${jwt.refresh_cookie_name}")
    public String refresh_cookie_name;

    public Cookie getAccessToken(UserDetailsX user, String issuer) {
        final var token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date().toInstant().plusSeconds(access_token_expiration))
                .withIssuer(issuer)
                .withClaim("rights", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                .withClaim("role", user.getRole().toString())
                .withClaim("userId", user.getId())
                .sign(algorithm);
        final var cookie = new Cookie(access_cookie_name, "Bearer_" + token);
        cookie.setMaxAge((int) access_token_expiration);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }
    public Cookie getRefreshToken(UserDetailsX user, String issuer) {
        final var token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date().toInstant().plusSeconds(refresh_token_expiration))
                .withIssuer(issuer)
                .sign(algorithm);
        final var cookie = new Cookie(refresh_cookie_name, "Bearer_" + token);
        cookie.setMaxAge((int) refresh_token_expiration);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }
    public DecodedJWT decode(String token) {
        if (token != null && token.startsWith("Bearer_")) {
            String trimmed = token.substring("Bearer_".length());
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(trimmed);
        }
        else throw new RuntimeException("No token is present.");
    }
    public List<Cookie> getDeleteCookies() {
        var cookies = new ArrayList<Cookie>(2);
        for (var cookieName: List.of(access_cookie_name, refresh_cookie_name)) {
            var cookie = new Cookie(cookieName, "");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(0);
            cookie.setPath("/");
            cookies.add(cookie);
        }
        return cookies;
    }
    public void writeError(HttpServletResponse response, String message, int error) {
        log.error("Error on token processing attempt: {}", message);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setHeader("error", message);
        response.setStatus(error);
    }
}
