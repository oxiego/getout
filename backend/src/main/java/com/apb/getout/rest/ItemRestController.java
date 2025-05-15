package com.apb.getout.rest;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apb.getout.entity.Item;
import com.apb.getout.entity.repository.ItemRepository;
import com.apb.getout.exception.ItemNotFoundException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemRestController {
	
	private final ItemRepository itemRepository;
	
	@GetMapping
	public List<Item> getAllItems() {
		return itemRepository.findAll();
	}
	
	@PostMapping
	public Item addMapping(@RequestBody Item item) {
		item.setCreated(new Timestamp(new Date().getTime()));
		return itemRepository.save(item);
	}

	@PutMapping("/{uuid}")
	public Item getMethodName(@PathVariable("uuid") UUID uuid, @RequestBody Item item) {
		return itemRepository.findById(uuid).map(existing -> {
			BeanUtils.copyProperties(item, existing, "uuid", "createdAt");
			return itemRepository.save(existing);
		}).orElseThrow(() -> new ItemNotFoundException(uuid));
	}
	
	@GetMapping("/{uuid}")
	public Item getMethodName(@PathVariable("uuid") UUID uuid) {
		return itemRepository.findById(uuid).orElseThrow(() -> new ItemNotFoundException(uuid));
	}
	
	@DeleteMapping("/{id}")
	public void deleteItem(@PathVariable("id") UUID id) {
		itemRepository.deleteById(id);
	}
	
}
