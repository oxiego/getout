package com.apb.getout.service;

import java.util.List;
import java.util.UUID;

import com.apb.getout.data.Category;

public interface CategoryService {
	Category findCategoryById(UUID id);
	List<Category> findAll();
	Category save(Category convertValue);
}
