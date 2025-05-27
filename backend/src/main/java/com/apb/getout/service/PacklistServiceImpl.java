package com.apb.getout.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.apb.getout.entity.Packlist;
import com.apb.getout.entity.repository.PacklistRepository;
import com.apb.getout.exception.PacklistNotFoundException;

@Service
public class PacklistServiceImpl implements PacklistService {

	private PacklistRepository packlistRepository;
	
	public PacklistServiceImpl(PacklistRepository packlistrepository) {
		this.packlistRepository = packlistrepository;
		
	}

	@Override
	public List<Packlist> findAllPacklists() {
		return this.packlistRepository.findAll();
	}

	@Override
	public Packlist savePacklist(Packlist packlist) {
		return this.packlistRepository.save(packlist);
	}
	@Override
	public Packlist editPacklist(UUID uuid, Packlist packlist) {
		return packlistRepository.findById(uuid).map(existing -> {
			BeanUtils.copyProperties(packlist, existing, "uuid", "createdAt");
			return packlistRepository.save(existing);
		}).orElseThrow(() -> new PacklistNotFoundException(uuid));
	}

	@Override
	public Packlist getPacklist(UUID uuid) {
		return packlistRepository.findById(uuid).orElseThrow(() -> new PacklistNotFoundException(uuid));
	}

	@Override
	public void deletePacklist(UUID id) {
		packlistRepository.deleteById(id);
		
	}

}
