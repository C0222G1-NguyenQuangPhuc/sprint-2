package com.codegym.shop_online.repository;

import com.codegym.shop_online.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ICategoryRepository extends JpaRepository<Category, Integer> {

    @Query(value = " SELECT * FROM category WHERE delete_status = 0 ", nativeQuery = true)
    List<Category> getAllCategory();

}
