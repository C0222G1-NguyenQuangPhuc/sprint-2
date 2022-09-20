package com.codegym.shop_online.repository;

import com.codegym.shop_online.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IBillRepository extends JpaRepository<Bill, Integer> {

    @Query(value = " select * from bill where code = :code ", nativeQuery = true)
    Bill getBillByCode(@Param("code") int code);

}
