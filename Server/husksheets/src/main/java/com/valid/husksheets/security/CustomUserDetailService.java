package com.valid.husksheets.security;

import com.valid.husksheets.model.User;
import com.valid.husksheets.model.UserSystem;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import com.google.gson.Gson;

public class CustomUserDetailService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(final String username) {
        User user = findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(user);
    }

    private User findByUsername(String username) {
        try {
            String jsonString = Files.readString(Path.of("src/main/java/com/valid/husksheets/db/system.json"));
            UserSystem userSystem = new Gson().fromJson(jsonString, UserSystem.class);
            return userSystem.findByUsername(username);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
