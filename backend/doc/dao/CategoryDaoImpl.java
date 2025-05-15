package com.apb.getout.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.apb.getout.data.Category;
import com.apb.getout.entity.CategoryEntity;
import com.apb.getout.exception.CategoryNotFoundException;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Repository
public class CategoryDaoImpl implements CategoryDao {

	private EntityManager entityManager;

	@Autowired
	public CategoryDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public List<CategoryEntity> findAll() {
		TypedQuery<CategoryEntity> query = entityManager.createQuery("FROM category", CategoryEntity.class);
		return query.getResultList();
	}

	@Override
	public CategoryEntity findById(UUID id) {
		return entityManager.find(CategoryEntity.class, id);
	}

	@Override
	public CategoryEntity update(CategoryEntity category) {
		return entityManager.merge(category);
	}

	@Override
	public void delete(UUID id) {
		Category category = entityManager.find(Category.class, id);
		if (category == null) {
			throw new CategoryNotFoundException("Category with id=" + id + " not found");
		}
		entityManager.remove(category);
	}

}
