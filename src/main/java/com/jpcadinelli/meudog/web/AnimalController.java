package com.jpcadinelli.meudog.web;

import com.jpcadinelli.meudog.application.AnimalService;
import com.jpcadinelli.meudog.domain.Animal;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/animais")
public class AnimalController {

	private final AnimalService animalService;

	public AnimalController(AnimalService animalService) {
		this.animalService = animalService;
	}

	@PostMapping
	public ResponseEntity<AnimalResponse> create(@Valid @RequestBody AnimalRequest request) {
		Animal animal = animalService.create(
				request.nome(), request.especie(), request.idade(), request.raca(), request.sexo(), request.porte(), request.descricao()
		);
		return ResponseEntity.status(201).body(AnimalResponse.from(animal));
	}

	@GetMapping
	public ResponseEntity<List<AnimalResponse>> findAll() {
		return ResponseEntity.ok(animalService.findAll().stream().map(AnimalResponse::from).toList());
	}

	@GetMapping("/{id}")
	public ResponseEntity<AnimalResponse> findById(@PathVariable UUID id) {
		return ResponseEntity.ok(AnimalResponse.from(animalService.findById(id)));
	}
}
