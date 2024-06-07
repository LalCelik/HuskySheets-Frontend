package com.valid.husksheets.security;

import com.valid.husksheets.model.User;
import com.valid.husksheets.model.UserSystem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * UserDetailService needed for SpringBoot Security, we need to find user from the database and hand it to UserDetails
 * Owner: Sunkwan
 */
public class CustomUserDetailService implements UserDetailsService {
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private UserSystem userSystem;

    @Override
    public UserDetails loadUserByUsername(final String username) {
        User user = userSystem.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(user);
    }
}
