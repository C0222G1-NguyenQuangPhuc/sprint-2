package com.codegym.shop_online.dto;

import com.codegym.shop_online.model.ProductOrder;

import java.util.List;

public class ErrorDto {

    private String message;

    private List<String> messageList;

    private ProductOrder productOrder;

    public ErrorDto() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getMessageList() {
        return messageList;
    }

    public void setMessageList(List<String> messageList) {
        this.messageList = messageList;
    }

    public ProductOrder getProductOrder() {
        return productOrder;
    }

    public void setProductOrder(ProductOrder productOrder) {
        this.productOrder = productOrder;
    }
}