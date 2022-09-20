package com.codegym.shop_online.service.impl;

import com.codegym.shop_online.dto.ErrorDto;
import com.codegym.shop_online.dto.PaymentDto;
import com.codegym.shop_online.model.Bill;
import com.codegym.shop_online.model.Customer;
import com.codegym.shop_online.model.ProductOrder;
import com.codegym.shop_online.repository.IBillRepository;
import com.codegym.shop_online.repository.IProductOrderRepository;
import com.codegym.shop_online.repository.IProductRepository;
import com.codegym.shop_online.service.IProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Service
public class ProductOrderService implements IProductOrderService {

    @Autowired
    private IProductOrderRepository iProductOrderRepository;

    @Autowired
    private IBillRepository iBillRepository;

    @Autowired
    private IProductRepository iProductRepository;

    @Override
    public ErrorDto saveOrder(ProductOrder productOrder) {
        ErrorDto errorDto = new ErrorDto();
        productOrder.setDeleteStatus(false);
        ProductOrder po = this.iProductOrderRepository.findProductOrderListByCustomerAndProduct(productOrder);
        if (po == null) {
            if (productOrder.getQuantity() > productOrder.getProduct().getQuantity()) {
                errorDto.setMessage("quantity");
                errorDto.setProductOrder(po);
                return errorDto;
            } else {
                this.iProductOrderRepository.save(productOrder);
            }
        } else {
            if ((po.getQuantity() + productOrder.getQuantity()) > productOrder.getProduct().getQuantity()) {
                errorDto.setMessage("quantity");
                errorDto.setProductOrder(po);
                return errorDto;
            } else {
                po.setQuantity(productOrder.getQuantity() + po.getQuantity());
                this.iProductOrderRepository.save(po);
            }
        }
        return errorDto;
    }

    @Override
    public List<ProductOrder> getProductInCardByCustomer(Customer customer) {
        return this.iProductOrderRepository.getProductInCardByCustomer(customer);
    }

    @Override
    public Boolean minusQuantity(ProductOrder productOrder) {
        if (productOrder.getQuantity() > 1) {
            productOrder.setQuantity(productOrder.getQuantity() - 1);
            this.iProductOrderRepository.save(productOrder);
            return true;
        }
        return false;
    }

    @Override
    public Boolean plusQuantity(ProductOrder productOrder) {
        if (productOrder.getQuantity() < productOrder.getProduct().getQuantity()) {
            productOrder.setQuantity(productOrder.getQuantity() + 1);
            this.iProductOrderRepository.save(productOrder);
            return true;
        }
        return false;
    }

    @Override
    public Boolean findProductOrder(ProductOrder productOrder) {
        ProductOrder po = this.iProductOrderRepository.findById(productOrder.getId()).orElse(null);
        if (po != null) {
            this.iProductOrderRepository.delete(productOrder);
            return true;
        }
        return false;
    }

    @Transactional
    @Override
    public PaymentDto goPayment(Customer customer) {
        List<ProductOrder> productOrderList = this.iProductOrderRepository.getProductInCardByCustomer(customer);
        List<Bill> billList = this.iBillRepository.findAll();
        int randomCode = this.getRandomNumber(billList);
        Bill bill = new Bill();
        bill.setCode(String.valueOf(randomCode));
        bill.setProductOrderList(productOrderList);
        bill.setDeleteStatus(false);
        bill.setCreationDate(new Date(System.currentTimeMillis()));
        this.iBillRepository.save(bill);
        Bill billBack = this.iBillRepository.getBillByCode(randomCode);
        this.iProductOrderRepository.setBill(customer.getId(), billBack.getId());
        return null;
    }

    @Override
    public Page<ProductOrder> findProductOrderByUserName(Pageable pageable, Customer customer) {
        return this.iProductOrderRepository.findProductOrderByCustomer(pageable, customer);
    }


    private int getRandomNumber(List<Bill> billList) {
        int randomNumber = 10000;
        while (checkExists(billList, randomNumber)) {
            randomNumber = (int) ( (Math.random() * 89999) + 10001);
        }
        return randomNumber;
    }

    private boolean checkExists(List<Bill> billList, int randomNumber) {
        for (Bill bill : billList) {
            if (Integer.parseInt(bill.getCode()) == randomNumber) {
                return true;
            }
        }
        return false;
    }


}
