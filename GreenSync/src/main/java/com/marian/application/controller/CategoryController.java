package com.marian.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.marian.application.model.CategoryInfo;

import com.marian.application.repository.CategoryInterface;
import com.marian.application.service.CategoryService;



@RestController
@CrossOrigin(origins="https://localhost:3001")
public class CategoryController
{

    @Autowired
    public CategoryService categoryservice;

    @Autowired
    public CategoryInterface categoryrepo;  // Injecting the repository

    @GetMapping("/api/category")  // Get all user data
    public List<CategoryInfo> showAllCategory() {
        return categoryservice.getAllCategory();
    }

    @PostMapping("/api/addcategory")  // Add new user data
    public CategoryInfo addCategory(@RequestBody CategoryInfo category) {
        return categoryservice.saveCategory(category);
    }

    @DeleteMapping("/api/category/{id}")  // Delete user data by ID
    public String removeCategory(@PathVariable int id) {
        return categoryservice.deleteCategory(id);
    }
    @PutMapping("/api/category/{id}")
    public String updateCategory(@PathVariable int id,@RequestBody CategoryInfo category)
    {
    	return categoryservice.updateCategory(id,category);
    }
   
}
