package com.jpcadinelli.meudog.application;

public class AnimalNotFoundException extends RuntimeException {

	public AnimalNotFoundException() {
		super("Animal não encontrado");
	}
}
