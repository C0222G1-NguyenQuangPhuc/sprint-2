package com.codegym.shop_online.repository;

import com.codegym.shop_online.dto.StatisticsCustomerDto;
import com.codegym.shop_online.dto.StatisticsDto;
import com.codegym.shop_online.model.Customer;
import com.codegym.shop_online.model.ProductOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IProductOrderRepository extends JpaRepository<ProductOrder, Integer> {
    @Query(value = " select po.* from product_order po " +
            " join customer c on c.id = po.customer_id " +
            " join product p on p.id = po.product_id " +
            " where po.customer_id = :#{#productOrder.customer.id} and po.product_id = :#{#productOrder.product.id} and po.bill_id is null ", nativeQuery = true)
    ProductOrder findProductOrderListByCustomerAndProduct(ProductOrder productOrder);

    @Query(value = " select po.* from product_order po " +
            " join customer c on c.id = po.customer_id " +
            " join product p on p.id = po.product_id " +
            " where po.customer_id = :#{#customer.id} and bill_id is null ", nativeQuery = true)
    List<ProductOrder> getProductInCardByCustomer(Customer customer);

    @Modifying
    @Transactional
    @Query(value = " UPDATE `product_order` SET `bill_id` = :billId WHERE (`customer_id` = :customerId) and `bill_id` is null ", nativeQuery = true)
    void setBill(@Param("customerId") Integer customerId, @Param("billId") Integer billId);

    @Query(value = " select po.id, po.delete_status,po.bill_id, po.customer_id, po.product_id, count(po.quantity) as quantity from bill " +
            " join product_order po on bill.id = po.bill_id " +
            " where po.customer_id = :#{#customer.id} " +
            " group by po.product_id ", nativeQuery = true,
            countQuery = " select po.id, po.delete_status,po.bill_id, po.customer_id, po.product_id, count(po.quantity) as quantity from bill " +
                    "join product_order po on bill.id = po.bill_id " +
                    "where po.customer_id = :#{#customer.id} " +
                    "group by po.product_id ")
    Page<ProductOrder> findProductOrderByCustomer(Pageable pageable, Customer customer);

    @Query(value = "select sum(po.quantity) as quantity, p.name as name, b.creation_date as createDate from product_order po " +
            "join bill b on b.id = po.bill_id " +
            "join product p on p.id = po.product_id " +
            "join customer c on c.id = po.customer_id " +
            "group by po.product_id " +
            "having b.creation_date >= current_date - interval 7 day and b.creation_date < current_date - interval - 1 day " +
            "order by sum(quantity) desc limit 10;", nativeQuery = true)
    List<StatisticsDto> findAllStatisticsWeek();

    @Query(value = "select sum(po.quantity) as quantity, p.name as name, b.creation_date as createDate from product_order po " +
            "join bill b on b.id = po.bill_id " +
            "join product p on p.id = po.product_id " +
            "join customer c on c.id = po.customer_id " +
            "group by po.product_id " +
            "having b.creation_date >= current_date - interval 30 day and b.creation_date < current_date - interval - 1 day " +
            "order by sum(quantity) desc limit 10", nativeQuery = true)
    List<StatisticsDto> findAllStatisticsMonth();

    @Query(value = "select sum(po.quantity) as quantity, p.name as name, b.creation_date as createDate from product_order po " +
            "join bill b on b.id = po.bill_id " +
            "join product p on p.id = po.product_id " +
            "join customer c on c.id = po.customer_id " +
            "group by po.product_id " +
            "having b.creation_date >= current_date - interval 365 day and b.creation_date < current_date - interval - 1 day " +
            "order by sum(quantity) desc limit 10", nativeQuery = true)
    List<StatisticsDto> findAllStatisticsYear();


    @Query(value = " select sum(po.quantity) as quantity, c.name as name, c.address as address, c.phone_number as phone, c.email as email from product_order po " +
            " join bill b on b.id = po.bill_id " +
            " join product p on p.id = po.product_id " +
            " join customer c on c.id = po.customer_id " +
            " group by po.customer_id  " +
            " order by sum(quantity) desc " +
            " limit 10 ", nativeQuery = true)
    List<StatisticsCustomerDto> findAllStatisticsCustomer();            
}
