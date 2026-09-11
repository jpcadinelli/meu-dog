package com.jpcadinelli.meudog.application;

import com.jpcadinelli.meudog.domain.Animal;
import com.jpcadinelli.meudog.domain.AnimalId;
import com.jpcadinelli.meudog.domain.AnimalPorte;
import com.jpcadinelli.meudog.domain.AnimalSexo;
import com.jpcadinelli.meudog.infrastructure.AnimalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
	public List<Animal> findAll() {
		return animalRepository.findAll();
	}

	@Transactional(readOnly = true)
	public Animal findById(UUID id) {
		return animalRepository.findById(new AnimalId(id))
				.orElseThrow(AnimalNotFoundException::new);
	}
}
