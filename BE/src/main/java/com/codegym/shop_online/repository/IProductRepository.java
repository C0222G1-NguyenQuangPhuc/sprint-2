package com.codegym.shop_online.repository;

import com.codegym.shop_online.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface IProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "SELECT * FROM product where delete_status = 0 ORDER BY release_time DESC limit 8 ", nativeQuery = true)
    List<Product> getNewProducts();

    @Query(value = "SELECT * FROM product where `name` like %:name% ORDER BY release_time DESC", nativeQuery = true)
    Page<Product> findAllByName(Pageable pageable, @Param("name") String name);

    @Query(value = "SELECT * FROM product where category_id = :id ORDER BY release_time DESC", nativeQuery = true)
    Page<Product> findAllByCategory(Pageable pageable, @Param("id") Integer id);

}
