package com.apb.getout.dao;

import java.util.List;
import java.util.UUID;

import com.apb.getout.data.Category;
import com.apb.getout.entity.CategoryEntity;

public interface CategoryDao {

	List<CategoryEntity> findAll();
	CategoryEntity findById (UUID id );

	CategoryEntity update(CategoryEntity entity);

	void delete(UUID id);
}
