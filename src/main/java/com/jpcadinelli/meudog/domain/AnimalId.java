package com.jpcadinelli.meudog.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public record AnimalId(@Column(name = "id") UUID value) implements Serializable {

	public AnimalId {
		Objects.requireNonNull(value, "O identificador do animal não pode ser nulo");
	}

	public static AnimalId newId() {
		return new AnimalId(UUID.randomUUID());
	}
}
