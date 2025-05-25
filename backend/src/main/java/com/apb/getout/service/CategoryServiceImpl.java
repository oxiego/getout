package com.apb.getout.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.apb.getout.entity.Category;
import com.apb.getout.entity.repository.CategoryRepository;
import com.apb.getout.exception.CategoryNotFoundException;

@Service
public class CategoryServiceImpl implements CategoryService {

	private final CategoryRepository categoryRepository;

	public CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	@Override
	public List<Category> findAll() {
		return categoryRepository.findAll(Sort.by("name"));
	}

	@Override
	public Category save(Category category) {
		return categoryRepository.save(category);
	}

	@Override
	public Category updateCategory(UUID id, Category category) {
		return categoryRepository.findById(id).map(existing -> {
			existing.setName(category.getName());
			existing.setDescription(category.getDescription());
			return categoryRepository.save(existing);
		}).orElseThrow(() -> new CategoryNotFoundException("Category not found: " + id));
	}

	@Override
	public void deleteCategory(UUID id) {
		categoryRepository.deleteById(id);
		;
	}

}
