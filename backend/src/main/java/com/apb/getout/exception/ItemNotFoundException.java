package com.apb.getout.exception;

import java.util.UUID;

public class ItemNotFoundException extends RuntimeException  {

	private static final long serialVersionUID = -1675791709543714174L;

	public ItemNotFoundException(UUID uuid) {
		super("Item with id = " + uuid + " not found");
	}

}
