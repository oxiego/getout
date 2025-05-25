package com.apb.getout.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.apb.getout.entity.Item;
import com.apb.getout.entity.repository.ItemRepository;
import com.apb.getout.exception.ItemNotFoundException;

@Service
public class ItemServiceImpl implements ItemService{

	private ItemRepository itemRepository;

	public ItemServiceImpl(ItemRepository itemRepository) {
		this.itemRepository = itemRepository;
	}

	@Override
	public List<Item> findAllItems() {
		return this.itemRepository.findAll();
	}

	
	@Override
	public Item save(Item item) {
		return this.itemRepository.save(item);
	}

	@Override
	public Item editItem(UUID uuid, Item item) {
		return itemRepository.findById(uuid).map(existing -> {
			BeanUtils.copyProperties(item, existing, "uuid", "createdAt");
			return itemRepository.save(existing);
		}).orElseThrow(() -> new ItemNotFoundException(uuid));
	}

	@Override
	public Item getItem(UUID uuid) {
		return itemRepository.findById(uuid).orElseThrow(() -> new ItemNotFoundException(uuid));
	}

	@Override
	public void deleteItem(UUID id) {
		itemRepository.deleteById(id);
		
	}
}
