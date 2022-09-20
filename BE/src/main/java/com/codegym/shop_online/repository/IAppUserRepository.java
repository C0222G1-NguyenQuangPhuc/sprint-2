package com.codegym.shop_online.repository;

import com.codegym.shop_online.model.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IAppUserRepository extends JpaRepository<AppUser, Integer> {

    @Query(value = "SELECT id, delete_status, user_name, password FROM app_user WHERE user_name = :username and delete_status = 0", nativeQuery = true)
    AppUser getAppUserByUsername(@Param("username") String username);
}
