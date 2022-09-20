package com.codegym.shop_online.service;

import com.codegym.shop_online.model.user.AppUser;

import java.util.List;

public interface IAppUserService {

    AppUser findAppUserByUsername(String username);

    void save(AppUser appUser);

    List<AppUser> findAll();

}
