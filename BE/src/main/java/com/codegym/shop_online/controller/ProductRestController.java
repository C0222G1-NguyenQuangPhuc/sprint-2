package com.codegym.shop_online.controller;

import com.codegym.shop_online.model.Product;
import com.codegym.shop_online.service.IProductService;
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
@RequestMapping("/products")
@PreAuthorize("isAuthenticated()")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ProductRestController {

    @Autowired
    private IProductService iProductService;

    @GetMapping(value = "/new")
    public ResponseEntity<List<Product>> getNewProducts() {
        List<Product> productList = iProductService.getNewProducts();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<Product>> findAll(@PageableDefault(value = 8) Pageable pageable) {
        Page<Product> productPage = iProductService.findAll(pageable);
        if (productPage.hasContent()) {
            return new ResponseEntity<>(productPage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search/{page}")
    public ResponseEntity<Page<Product>> findAllByName(@PathVariable("page") Integer page,
                                                       @RequestParam("name") String name) {
        Sort sort = Sort.by("release_time").descending();
        Page<Product> productPage = iProductService.findAllByName(PageRequest.of(page, 4, sort),name);
        if (productPage.hasContent()) {
            return new ResponseEntity<>(productPage, HttpStatus.OK);
        }
         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<Product>> findAllByCategory(@PageableDefault(value = 8) Pageable pageable,
                                                       @RequestParam("id") Integer id) {
        Page<Product> productPage = iProductService.findAllByCategory(pageable,id);
        if (productPage.hasContent()) {
            return new ResponseEntity<>(productPage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = iProductService.findById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

}
