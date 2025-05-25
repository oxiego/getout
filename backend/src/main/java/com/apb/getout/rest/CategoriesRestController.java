package com.apb.getout.rest;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apb.getout.entity.Category;
import com.apb.getout.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoriesRestController {

	private CategoryService categoryService;

	public CategoriesRestController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	@GetMapping
	public List<Category> listAllCategories() {
		return categoryService.findAll();
	}

	@PostMapping
	public Category addCategory(@RequestBody Category category) {
		return categoryService.save(category);
	}

	@PutMapping("/{id}")
	public Category saveCategory(@PathVariable("id") UUID id, @RequestBody Category category) {
		return this.categoryService.updateCategory(id, category);
	}

	@DeleteMapping("/{id}")
	public void deleteCategory(@PathVariable("id") UUID id) {
		categoryService.deleteCategory(id);
	}

}
