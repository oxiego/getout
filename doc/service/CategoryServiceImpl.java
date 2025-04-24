package com.apb.getout.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apb.getout.data.Category;
import com.apb.getout.entity.CategoryEntity;
import com.apb.getout.entity.repository.CategoryRepository;
import com.apb.getout.exception.CategoryNotFoundException;
import com.apb.getout.map.CategoryMapper;

import jakarta.transaction.Transactional;

@Service
public class CategoryServiceImpl implements CategoryService {

	private CategoryMapper categoryMapper;
	private CategoryRepository categoryRepository;

	@Autowired
	public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
		this.categoryMapper = categoryMapper;
		this.categoryRepository = categoryRepository;
	}

	public Category findCategoryById(UUID id) {
		CategoryEntity categoryEntity = categoryRepository.findById(id)
				.orElseThrow(() -> new CategoryNotFoundException("Categoriy id=" + id + " not found"));
		return categoryMapper.toDto(categoryEntity);
	}

	@Transactional
	public Category save(Category category) {
		return categoryMapper.toDto(categoryRepository.save(categoryMapper.toEntity(category)));
	}

	@Transactional
	public void delete(UUID id) {
		categoryRepository.deleteById(id);
	}

	@Override
	public List<Category> findAll() {
		return categoryMapper.toDtoList(categoryRepository.findAll());
	}

}
