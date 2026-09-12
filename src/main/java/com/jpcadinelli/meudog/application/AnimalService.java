package com.jpcadinelli.meudog.application;

import com.jpcadinelli.meudog.domain.Animal;
import com.jpcadinelli.meudog.domain.AnimalId;
import com.jpcadinelli.meudog.domain.AnimalPorte;
import com.jpcadinelli.meudog.domain.AnimalSexo;
import com.jpcadinelli.meudog.infrastructure.AnimalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

@Service
public class AnimalService {

	private final AnimalRepository animalRepository;

	public AnimalService(AnimalRepository animalRepository) {
		this.animalRepository = animalRepository;
	}

	@Transactional
	public Animal create(String nome, String especie, Integer idade, String raca, AnimalSexo sexo, AnimalPorte porte, String descricao) {
		return animalRepository.save(new Animal(nome, especie, idade, raca, sexo, porte, descricao));
	}

	@Transactional(readOnly = true)
	public Page<Animal> findAll(Pageable pageable) {
		return animalRepository.findAll(pageable);
	}

	@Transactional(readOnly = true)
	public Animal findById(UUID id) {
		return animalRepository.findById(new AnimalId(id))
				.orElseThrow(AnimalNotFoundException::new);
	}

	@Transactional
	public Animal update(UUID id, String nome, String especie, Integer idade, String raca, AnimalSexo sexo, AnimalPorte porte, String descricao) {
		Animal animal = findById(id);
		animal.update(nome, especie, idade, raca, sexo, porte, descricao);
		return animal;
	}

	@Transactional
	public void delete(UUID id) {
		AnimalId animalId = new AnimalId(id);
		if (!animalRepository.existsById(animalId)) {
			throw new AnimalNotFoundException();
		}
		animalRepository.deleteById(animalId);
	}
}
