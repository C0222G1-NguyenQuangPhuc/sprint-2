package com.codegym.shop_online.service.impl;

import com.codegym.shop_online.model.Customer;
import com.codegym.shop_online.repository.IAppUserRepository;
import com.codegym.shop_online.repository.ICustomerRepository;
import com.codegym.shop_online.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements ICustomerService {

    @Autowired
    private ICustomerRepository iCustomerRepository;

    @Autowired
    private IAppUserRepository iAppUserRepository;

    @Override
    public Customer getCustomerByUsername(String username) {
        return this.iCustomerRepository.getCustomerByUsername(username);
    }

    @Override
    public void save(Customer customer) {

    }
}
