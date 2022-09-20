package com.codegym.shop_online.controller;

import com.codegym.shop_online.model.Customer;
import com.codegym.shop_online.model.ProductOrder;
import com.codegym.shop_online.model.user.AppUser;
import com.codegym.shop_online.service.IAppUserService;
import com.codegym.shop_online.service.IProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class UserRestController {

    @Autowired
    private IAppUserService iAppUserService;

    @Autowired
    private IProductOrderService iProductOrderService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/users")
    public ResponseEntity<List<AppUser>> getAllUser() {
        List<AppUser> appUsers = this.iAppUserService.findAll();
        return new ResponseEntity<>(appUsers, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/cart/ordered")
    public ResponseEntity<?> getOrdersByCustomer(@RequestBody Customer customer, @PageableDefault(5) Pageable pageable) {
        Page<ProductOrder> productOrderPage = this.iProductOrderService.findProductOrderByUserName(PageRequest.of(0,100),customer);
        if (productOrderPage.hasContent()) {
            return new ResponseEntity<>(productOrderPage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
