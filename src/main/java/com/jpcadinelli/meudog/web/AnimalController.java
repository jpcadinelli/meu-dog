package com.jpcadinelli.meudog.web;

import com.jpcadinelli.meudog.application.AnimalService;
import com.jpcadinelli.meudog.domain.Animal;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/animais")
public class AnimalController {

	private static final Set<Integer> ALLOWED_PAGE_SIZES = Set.of(10, 50, 100);
	private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("status", "nome", "especie", "raca", "idade", "dataCadastro");

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
	public ResponseEntity<AnimalPageResponse> findAll(
			@PageableDefault(size = 10, sort = "dataCadastro", direction = Sort.Direction.DESC) Pageable pageable) {
		validatePageable(pageable);
		return ResponseEntity.ok(AnimalPageResponse.from(animalService.findAll(pageable)));
	}

	private void validatePageable(Pageable pageable) {
		if (!ALLOWED_PAGE_SIZES.contains(pageable.getPageSize())) {
			throw new IllegalArgumentException("O tamanho da página deve ser 10, 50 ou 100");
		}
		if (pageable.getSort().stream().anyMatch(order -> !ALLOWED_SORT_FIELDS.contains(order.getProperty()))) {
			throw new IllegalArgumentException("Campo de ordenação inválido");
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<AnimalResponse> findById(@PathVariable UUID id) {
		return ResponseEntity.ok(AnimalResponse.from(animalService.findById(id)));
	}

	@PutMapping("/{id}")
	public ResponseEntity<AnimalResponse> update(@PathVariable UUID id, @Valid @RequestBody AnimalRequest request) {
		Animal animal = animalService.update(
				id, request.nome(), request.especie(), request.idade(), request.raca(), request.sexo(), request.porte(), request.descricao()
		);
		return ResponseEntity.ok(AnimalResponse.from(animal));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable UUID id) {
		animalService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
