package com.apb.getout.rest;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apb.getout.entity.Category;
import com.apb.getout.entity.repository.CategoryRepository;
import com.apb.getout.exception.CategoryNotFoundException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoriesRestController {

	private final CategoryRepository categoryRepository;

	@GetMapping
	public List<Category> listAllCategories() {
		return categoryRepository.findAll(Sort.by("name"));
	}

	@PostMapping
	public Category addCategor(@RequestBody Category category) {
		return categoryRepository.save(category);
	}

	@PutMapping("/{id}")
	public Category saveCategory(@PathVariable("id") UUID id, @RequestBody Category category) {

		return categoryRepository.findById(id).map(existing -> {
			existing.setName(category.getName());
			existing.setDescription(category.getDescription());
			return categoryRepository.save(existing);
		}).orElseThrow(() -> new CategoryNotFoundException("Category not found: " + id));
	}

	@DeleteMapping("/{id}")
	public void deleteCategory(@PathVariable("id") UUID id) {
		categoryRepository.deleteById(id);
	}

}
