package com.valid.husksheets.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 *
 * Owner: Sunkwan
 */
@Configuration
public class SecurityConfiguration {
    /**
     * Requires authentication for all requests except "/api/v1/register"
     * @param http http object to be filtered
     * @return The FilterChain required by the SpringBoot Security
     * @throws Exception for any exception when authorizing
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("/api/v1/registerUser").permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(withDefaults());
        return http.build();
    }

    /**
     * Load the CustomUserDetailsService that we connect to DB with
     * @return UserDetailsService used by the SpringBoot Security
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailService();
    }

    /**
     * Using Bcrypt encoder
     * @return PasswordEncoder to be handed to the SpringBoot Security
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}