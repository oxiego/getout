package com.apb.getout.exception;

public class IdMismatchException extends RuntimeException {

	private static final long serialVersionUID = -7139003663562846228L;

	public IdMismatchException(String ... ids) {
		super("The IDs: " + String.join(",", ids)  + " do not match");
	}

}
