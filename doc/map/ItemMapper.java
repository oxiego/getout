package com.apb.getout.map;

import java.util.List;

import org.mapstruct.Mapper;

import com.apb.getout.data.Item;
import com.apb.getout.entity.ItemEntity;

@Mapper(componentModel = "spring")
public interface ItemMapper {
	Item toDto(ItemEntity entity);
    ItemEntity toEntity(Item dto);
    List<Item> toDtoList(List<ItemEntity> entities);
    List<ItemEntity> toEntityList(List<Item> dtos);
}
