package com.apb.getout.service;

import java.util.List;
import java.util.UUID;

import com.apb.getout.dto.ItemDto;
import com.apb.getout.entity.Item;

public interface ItemService {

	List<ItemDto> findAllItems();

	ItemDto save(ItemDto item);

	ItemDto editItem(UUID uuid, ItemDto item);

	ItemDto getItem(UUID uuid);

	void deleteItem(UUID id);

}
