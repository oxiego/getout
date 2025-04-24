package com.apb.getout.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apb.getout.data.Category;
import com.apb.getout.exception.CategoryNotFoundException;
import com.apb.getout.exception.IdMismatchException;
import com.apb.getout.service.CategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/api/categories")
public class CategoryRestController {

	private CategoryService categoryService;
	private ObjectMapper objectMapper;

	@Autowired
	public CategoryRestController(CategoryService categoryService, ObjectMapper objectMapper) {
		this.categoryService = categoryService;
		this.objectMapper = objectMapper;
	}

	@GetMapping("/")
	List<Category> listCategories() {
		List<Category> categories = new ArrayList<Category>();
		categories.add(new Category(UUID.randomUUID(), "Küche", "Küchenutensilien",new ArrayList()));
		return categoryService.findAll();
	}

	@GetMapping("/{id}")
	Category getCategory(@PathVariable("id") UUID id) {
		return categoryService.findCategoryById(id);
	}

	@PatchMapping("/{id}")
	Category patchCategory(@PathVariable("id") UUID id, @RequestBody Map<String, Object> payload) {
		Category category = categoryService.findCategoryById(id);
		if (category == null) {
			throw new CategoryNotFoundException("Patching Category: Category " + id + " not found");
		}

		if (payload.containsKey("id") && (!payload.get("id").equals(id.toString()) || !category.getId().equals(id))) {
			throw new IdMismatchException(id.toString(), payload.get("id").toString(), category.getId().toString());
		}

		ObjectNode categoryNode = objectMapper.convertValue(category, ObjectNode.class);
		ObjectNode patchNode = objectMapper.convertValue(payload, ObjectNode.class);
		categoryNode.setAll(patchNode);

		return categoryService.save(objectMapper.convertValue(categoryNode, Category.class));
	}
}
