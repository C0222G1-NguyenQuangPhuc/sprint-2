package com.codegym.shop_online.dto;

import com.codegym.shop_online.model.Bill;
import com.codegym.shop_online.model.Customer;
import com.codegym.shop_online.model.ProductOrder;

import java.util.List;

public class PaymentDto {
    private List<ProductOrder> productOrderList;
    private Customer customer;
    private Bill bill;

    public PaymentDto() {
    }

    public List<ProductOrder> getProductOrderList() {
        return productOrderList;
    }

    public void setProductOrderList(List<ProductOrder> productOrderList) {
        this.productOrderList = productOrderList;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }
}
