package com.codegym.shop_online.repository;

import com.codegym.shop_online.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ICustomerRepository extends JpaRepository<Customer, Integer> {
    @Query(value = "SELECT c.* FROM customer c " +
            " JOIN app_user au ON au.id = c.user_id " +
            " WHERE user_name = :username ", nativeQuery = true)
    Customer getCustomerByUsername(@Param("username") String username);
}
