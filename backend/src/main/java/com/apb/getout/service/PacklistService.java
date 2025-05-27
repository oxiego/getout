package com.apb.getout.service;

import java.util.List;
import java.util.UUID;

import com.apb.getout.entity.Item;
import com.apb.getout.entity.Packlist;

public interface PacklistService {

	List<Packlist> findAllPacklists();

	Packlist savePacklist(Packlist packlist);

	Packlist editPacklist(UUID uuid, Packlist packlist);

	Packlist getPacklist(UUID uuid);

	void deletePacklist(UUID id);


}
