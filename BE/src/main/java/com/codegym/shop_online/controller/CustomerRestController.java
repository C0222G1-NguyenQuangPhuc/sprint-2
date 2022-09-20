package com.codegym.shop_online.controller;

import com.codegym.shop_online.model.Customer;
import com.codegym.shop_online.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class CustomerRestController {
    @Autowired
    private ICustomerService iCustomerService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/get/{username}")
    public ResponseEntity<Customer> getCustomerByUsername(@PathVariable String username) {
        Customer customer = this.iCustomerService.getCustomerByUsername(username);
        if (customer == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

}
