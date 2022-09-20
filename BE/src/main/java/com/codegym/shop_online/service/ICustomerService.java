package com.codegym.shop_online.service;

import com.codegym.shop_online.model.Customer;

public interface ICustomerService {

    Customer getCustomerByUsername(String username);

    void save(Customer customer);

}
