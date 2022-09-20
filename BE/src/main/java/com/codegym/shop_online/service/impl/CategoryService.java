package com.codegym.shop_online.service.impl;

import com.codegym.shop_online.model.Category;
import com.codegym.shop_online.repository.ICategoryRepository;
import com.codegym.shop_online.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategoryRepository iCategoryRepository;

    @Override
    public List<Category> findAll() {
        return iCategoryRepository.findAll();
    }
}
