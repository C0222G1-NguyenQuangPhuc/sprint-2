package com.codegym.shop_online.service.impl;

import com.codegym.shop_online.model.user.AppUser;
import com.codegym.shop_online.repository.IAppUserRepository;
import com.codegym.shop_online.service.IAppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService implements IAppUserService {

    @Autowired
    private IAppUserRepository iAppUserRepository;

    @Override
    public AppUser findAppUserByUsername(String username) {
        return iAppUserRepository.getAppUserByUsername(username);
    }

    @Override
    public void save(AppUser appUser) {
        iAppUserRepository.save(appUser);
    }

    @Override
    public List<AppUser> findAll() {
        return iAppUserRepository.findAll() ;
    }
}
