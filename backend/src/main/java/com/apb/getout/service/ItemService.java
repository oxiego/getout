package com.apb.getout.service;

import java.util.List;
import java.util.UUID;

import com.apb.getout.entity.Item;

public interface ItemService {

	List<Item> findAllItems();

	Item save(Item item);

	Item editItem(UUID uuid, Item item);

	Item getItem(UUID uuid);

	void deleteItem(UUID id);

}
