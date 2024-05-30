package com.valid.husksheets.security;

import java.util.Collection;
import java.util.Collections;

import com.valid.husksheets.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


/**
 * UserDetails needed for the SpringBoot Security
 * Owner: Sunkwan
 */
public class CustomUserDetails implements UserDetails {
    /**
     * User object that we want to add detail
     */
    private final User user;

    /**
     * Instantiate CustomUserDetails class with the given user
     * @param user User we want plug in
     */
    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.<GrantedAuthority>singletonList(new SimpleGrantedAuthority("User"));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    @Override
    public boolean isEnabled() {
        return true;
    }

    /**
     * Getter method for the User
     * @return the User of the current UesrDetails
     */
    public User getUser() {
        return user;
    }
}
