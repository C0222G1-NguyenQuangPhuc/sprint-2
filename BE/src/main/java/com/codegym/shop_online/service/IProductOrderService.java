package com.codegym.shop_online.service;

import com.codegym.shop_online.dto.ErrorDto;
import com.codegym.shop_online.dto.PaymentDto;
import com.codegym.shop_online.model.Customer;
import com.codegym.shop_online.model.ProductOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductOrderService {

    ErrorDto saveOrder(ProductOrder productOrder);

    List<ProductOrder> getProductInCardByCustomer(Customer customer);

    Boolean minusQuantity(ProductOrder productOrder);

    Boolean plusQuantity(ProductOrder productOrder);

    Boolean findProductOrder(ProductOrder productOrder);

    PaymentDto goPayment(Customer customer);

    Page<ProductOrder> findProductOrderByUserName(Pageable pageable, Customer customer);

}
