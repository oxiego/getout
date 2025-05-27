package com.apb.getout.service;

import java.util.Base64;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.apb.getout.dto.ItemDto;
import com.apb.getout.entity.Item;
import com.apb.getout.entity.repository.ItemRepository;
import com.apb.getout.exception.ItemNotFoundException;
import com.apb.getout.map.ItemMapper;

@Service
public class ItemServiceImpl implements ItemService{

	private ItemRepository itemRepository;
	private ItemMapper itemMapper;

	public ItemServiceImpl(ItemRepository itemRepository, ItemMapper itemMapper) {
		this.itemRepository = itemRepository;
		this.itemMapper = itemMapper;
	}

	@Override
	public List<ItemDto> findAllItems() {
		return itemMapper.toDtoList(this.itemRepository.findAll());
	}

	
	@Override
	public ItemDto save(ItemDto item) {
		Item saved =this.itemRepository.save(itemMapper.toEntity(item)); 
		return this.itemMapper.toDto(saved);
	}

	
	@Override
	public ItemDto editItem(UUID uuid, ItemDto item) {
		Item sourceItem = itemMapper.toEntity(item);
		Item savedItem = itemRepository.findById(uuid).map(existing -> {
			BeanUtils.copyProperties(sourceItem, existing, "uuid", "createdAt");
			return itemRepository.save(existing);
		}).orElseThrow(() -> new ItemNotFoundException(uuid));
		return itemMapper.toDto(savedItem);
	}

	@Override
	public ItemDto getItem(UUID uuid) {
		Item item = itemRepository.findById(uuid).orElseThrow(() -> new ItemNotFoundException(uuid));
		return itemMapper.toDto(item);
	}

	@Override
	public void deleteItem(UUID id) {
		itemRepository.deleteById(id);
		
	}
}
