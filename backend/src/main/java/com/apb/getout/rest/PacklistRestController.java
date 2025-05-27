package com.apb.getout.rest;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apb.getout.entity.Packlist;
import com.apb.getout.service.PacklistService;

@RestController
@RequestMapping("/api/packlists")
public class PacklistRestController {

	private PacklistService packlistService;

	public PacklistRestController(PacklistService packlistService) {
		this.packlistService = packlistService;
	}

	@GetMapping
	public List<Packlist> getAllPacklists() {
		return packlistService.findAllPacklists();
	}
	
	@GetMapping("/{id}")
	public Packlist getPacklist(@PathVariable("id") UUID uuid) {
		return packlistService.getPacklist(uuid);
	}

	@PostMapping
	public Packlist savePacklist(@RequestBody Packlist packlist) {
		if (packlist.getUuid() == null) {
			return packlistService.savePacklist(packlist);
		} else {
			return packlistService.editPacklist(packlist.getUuid(), packlist);
		}
	}
	
	@DeleteMapping("/{id}")
	public void deletePacklist(@PathVariable("id") UUID id) {
		packlistService.deletePacklist(id);
	}

}
