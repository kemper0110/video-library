package com.vpr33.videolibrary.model.user;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserInfoMapper implements Function<User, UserInfo> {
    @Override
    public UserInfo apply(User user) {
        return new UserInfo(user.getId(), user.getUsername(), user.getRole());
    }
}
