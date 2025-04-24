package com.apb.getout.map;

import java.util.List;

import org.mapstruct.Mapper;

import com.apb.getout.data.Category;
import com.apb.getout.entity.CategoryEntity;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
	Category toDto(CategoryEntity entity);
    CategoryEntity toEntity(Category dto);
    List<Category> toDtoList(List<CategoryEntity> entities);
    List<CategoryEntity> toEntityList(List<Category> dtos);
}
