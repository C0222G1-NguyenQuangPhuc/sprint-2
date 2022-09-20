package com.codegym.shop_online.service.impl;

import com.codegym.shop_online.model.user.UserRole;
import com.codegym.shop_online.repository.IUserRoleRepository;
import com.codegym.shop_online.service.IUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRoleService implements IUserRoleService {

    @Autowired
    private IUserRoleRepository iUserRoleRepository;

    @Override
    public void save(UserRole userRole) {
        iUserRoleRepository.save(userRole);
    }
}
