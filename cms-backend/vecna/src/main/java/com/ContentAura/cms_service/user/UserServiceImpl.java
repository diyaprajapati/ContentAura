package com.ContentAura.cms_service.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public Integer getUserIdByEmail(String email) {
        return userRepository.findIdByEmail(email);
    }
}