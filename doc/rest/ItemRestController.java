package com.apb.getout.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apb.getout.data.Item;
import com.apb.getout.service.ItemService;

@RestController
@RequestMapping("/api/items")
public class ItemRestController {

	private ItemService itemService;
	
	@Autowired
	public ItemRestController(ItemService itemService) {
		this.itemService = itemService;
	}
	
	@GetMapping("/")
	List<Item> listAllItems() {
		return itemService.findAll();
	}
	
}
