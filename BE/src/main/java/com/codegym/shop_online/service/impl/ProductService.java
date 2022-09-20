package com.codegym.shop_online.service.impl;

import com.codegym.shop_online.model.Product;
import com.codegym.shop_online.repository.IProductRepository;
import com.codegym.shop_online.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProductService implements IProductService {

    @Autowired
    private IProductRepository iProductRepository;

    @Override
    public List<Product> getNewProducts() {
        return iProductRepository.getNewProducts();
    }

    @Override
    public void save(Product product) {
        product.setDeleteStatus(false);
        product.setReleaseTime(new Date(System.currentTimeMillis()));
        iProductRepository.save(product);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return iProductRepository.findAll(pageable);
    }

    @Override
    public Page<Product> findAllByName(Pageable pageable, String name) {
        return iProductRepository.findAllByName(pageable, name);
    }

    @Override
    public Page<Product> findAllByCategory(Pageable pageable, Integer id) {
        return iProductRepository.findAllByCategory(pageable, id);
    }

    @Override
    public Product findById(Integer id) {
        return iProductRepository.findById(id).orElse(null);
    }
}
