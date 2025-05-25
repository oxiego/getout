package com.apb.getout.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Sort;

import com.apb.getout.entity.Category;

public interface CategoryService {

	List<Category> findAll();

	Category save(Category category);

	Category updateCategory(UUID id, Category category);

	void deleteCategory(UUID id);

}
