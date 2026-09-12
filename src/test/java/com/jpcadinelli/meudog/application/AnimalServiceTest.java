package com.jpcadinelli.meudog.application;

import com.jpcadinelli.meudog.domain.Animal;
import com.jpcadinelli.meudog.domain.AnimalId;
import com.jpcadinelli.meudog.domain.AnimalPorte;
import com.jpcadinelli.meudog.domain.AnimalSexo;
import com.jpcadinelli.meudog.domain.StatusAdocao;
import com.jpcadinelli.meudog.infrastructure.AnimalRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AnimalServiceTest {

	private AnimalRepository animalRepository;
	private AnimalService animalService;

	@BeforeEach
	void setUp() {
		animalRepository = mock(AnimalRepository.class);
		animalService = new AnimalService(animalRepository);
	}

	@Test
	void shouldCreateAnimalAsAvailable() {
		when(animalRepository.save(any(Animal.class))).thenAnswer(invocation -> invocation.getArgument(0));

		Animal animal = animalService.create("Caramelo", "Cachorro", 3, "SRD", AnimalSexo.MACHO, AnimalPorte.MEDIO, "Dócil");

		assertEquals("Caramelo", animal.getNome());
		assertEquals("Cachorro", animal.getEspecie());
		assertEquals(StatusAdocao.DISPONIVEL, animal.getStatus());
		verify(animalRepository).save(any(Animal.class));
	}

	@Test
	void shouldFindAllAnimals() {
		List<Animal> animals = List.of(new Animal("Luna", "Cachorro", 2, "Labrador", AnimalSexo.FEMEA, AnimalPorte.GRANDE, null));
		when(animalRepository.findAll()).thenReturn(animals);

		assertSame(animals, animalService.findAll());
		verify(animalRepository).findAll();
	}

	@Test
	void shouldFindAnimalById() {
		UUID id = UUID.randomUUID();
		Animal animal = new Animal("Bob", "Cachorro", 5, "Beagle", AnimalSexo.MACHO, AnimalPorte.MEDIO, null);
		when(animalRepository.findById(new AnimalId(id))).thenReturn(Optional.of(animal));

		assertSame(animal, animalService.findById(id));
		verify(animalRepository).findById(new AnimalId(id));
	}

	@Test
	void shouldThrowNotFoundWhenAnimalDoesNotExist() {
		UUID id = UUID.randomUUID();
		when(animalRepository.findById(new AnimalId(id))).thenReturn(Optional.empty());

		assertThrows(AnimalNotFoundException.class, () -> animalService.findById(id));
		verify(animalRepository).findById(new AnimalId(id));
	}

	@Test
	void shouldUpdateExistingAnimal() {
		UUID id = UUID.randomUUID();
		Animal animal = new Animal("Bob", "Cachorro", 5, "Beagle", AnimalSexo.MACHO, AnimalPorte.MEDIO, null);
		when(animalRepository.findById(new AnimalId(id))).thenReturn(Optional.of(animal));

		Animal updated = animalService.update(id, "Bob", "Cachorro", 6, "Beagle", AnimalSexo.MACHO, AnimalPorte.MEDIO, "Muito dócil");

		assertSame(animal, updated);
		assertEquals(6, updated.getIdade());
		assertEquals("Muito dócil", updated.getDescricao());
		verify(animalRepository).findById(new AnimalId(id));
	}

	@Test
	void shouldThrowNotFoundWhenUpdatingMissingAnimal() {
		UUID id = UUID.randomUUID();
		when(animalRepository.findById(new AnimalId(id))).thenReturn(Optional.empty());

		assertThrows(AnimalNotFoundException.class,
				() -> animalService.update(id, "Bob", "Cachorro", 6, "Beagle", AnimalSexo.MACHO, AnimalPorte.MEDIO, null));
	}

	@Test
	void shouldDeleteExistingAnimal() {
		UUID id = UUID.randomUUID();
		when(animalRepository.existsById(new AnimalId(id))).thenReturn(true);

		animalService.delete(id);

		verify(animalRepository).deleteById(new AnimalId(id));
	}

	@Test
	void shouldThrowNotFoundWhenDeletingMissingAnimal() {
		UUID id = UUID.randomUUID();
		when(animalRepository.existsById(new AnimalId(id))).thenReturn(false);

		assertThrows(AnimalNotFoundException.class, () -> animalService.delete(id));
		verify(animalRepository, never()).deleteById(any());
	}
}
