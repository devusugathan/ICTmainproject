package com.marian.application.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marian.application.model.CategoryInfo;

import com.marian.application.repository.CategoryInterface;


@Service
public class CategoryService {
	@Autowired
    public CategoryInterface categoryrepo;

    // Get all user data
    public List<CategoryInfo> getAllCategory() {
        return categoryrepo.findAll();
    }

    // Save data after hashing the password
    public CategoryInfo saveCategory(CategoryInfo category) {
       

        // Save the data with the hashed password to the database
        return categoryrepo.save(category);
    }


    // Delete data by ID
    public String deleteCategory(int categoryId) {
        if (categoryrepo.existsById(categoryId)) {
        	categoryrepo.deleteById(categoryId);
            return "category Deleted";
        } else {
            return "category Not Found!";
        }
    }
    public String updateCategory(int id,CategoryInfo category)
    {
    	Optional<CategoryInfo> cat=categoryrepo.findById(id);
    	if(cat.isPresent()) //check whether employee is present or not, if present it will return true
    	{
    		CategoryInfo existingCat=cat.get();
    		
    		existingCat.setCategoryName(category.getCategoryName());
    		categoryrepo.save(existingCat);
    		return "Category Updated!";
    		}
    	else
    	{
    		return "Category not Found!";
    	}
    }
    

}
