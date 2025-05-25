package com.apb.getout.rest;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.apb.getout.service.ItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/items")
public class ItemRestController {
	
	
	private ItemService itemService;
	
	public ItemRestController (ItemService itemService) {
		this.itemService = itemService;
	}
	
	@GetMapping
	public List<Item> getAllItems() {
		return itemService.findAllItems();
	}
	
	@PostMapping
	public Item addItem(@RequestBody Item item) {
		item.setCreated(new Timestamp(new Date().getTime()));
		return itemService.save(item);
	}

	@PutMapping("/{uuid}")
	public Item editItem(@PathVariable("uuid") UUID uuid, @RequestBody Item item) {
		return itemService.editItem(uuid, item);
	}
	
	@GetMapping("/{uuid}")
	public Item getItem(@PathVariable("uuid") UUID uuid) {
		return itemService.getItem(uuid);
		
	}
	
	@DeleteMapping("/{id}")
	public void deleteItem(@PathVariable("id") UUID id) {
		itemService.deleteItem(id);
	}
	
}
