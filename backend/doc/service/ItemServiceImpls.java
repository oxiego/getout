package com.apb.getout.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.apb.getout.data.Item;
import com.apb.getout.entity.repository.ItemRepository;
import com.apb.getout.map.ItemMapper;

@Service
public class ItemServiceImpls implements ItemService {

	private ItemMapper itemMapper;
	private ItemRepository itemRepository;
	
	public ItemServiceImpls(ItemMapper itemMapper, ItemRepository itemRepository) {
		this.itemMapper = itemMapper;
		this.itemRepository = itemRepository;
	}
	
	@Override
	public List<Item> findAll() {
		return itemMapper.toDtoList(itemRepository.findAll());
	}

}
