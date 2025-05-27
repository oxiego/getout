package com.apb.getout.exception;

import java.util.UUID;

public class PacklistNotFoundException extends RuntimeException {

	public PacklistNotFoundException(UUID uuid) {
		super("Packlist with id = " + uuid + " not found");
	}
}
