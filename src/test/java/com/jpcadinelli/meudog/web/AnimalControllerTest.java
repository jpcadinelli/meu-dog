package com.jpcadinelli.meudog.web;

import com.jpcadinelli.meudog.application.AnimalNotFoundException;
import com.jpcadinelli.meudog.application.AnimalService;
import com.jpcadinelli.meudog.domain.Animal;
import com.jpcadinelli.meudog.domain.AnimalPorte;
import com.jpcadinelli.meudog.domain.AnimalSexo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AnimalController.class)
@Import(ApiExceptionHandler.class)
class AnimalControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AnimalService animalService;

	@Test
	void shouldCreateValidAnimal() throws Exception {
		Animal animal = new Animal("Caramelo", "Cachorro", 3, "SRD", AnimalSexo.MACHO, AnimalPorte.MEDIO, "Dócil");
		when(animalService.create("Caramelo", "Cachorro", 3, "SRD", AnimalSexo.MACHO, AnimalPorte.MEDIO, "Dócil"))
				.thenReturn(animal);

		mockMvc.perform(post("/api/animais")
					.contentType(MediaType.APPLICATION_JSON)
					.content(validBody()))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").value(animal.getId().value().toString()))
				.andExpect(jsonPath("$.especie").value("Cachorro"))
				.andExpect(jsonPath("$.status").value("DISPONIVEL"));
	}

	@Test
	void shouldRejectInvalidAnimalRequest() throws Exception {
		mockMvc.perform(post("/api/animais")
					.contentType(MediaType.APPLICATION_JSON)
					.content("""
							{"nome":"","especie":"","idade":-1,"raca":"","sexo":null,"porte":null}
							"""))
				.andExpect(status().isBadRequest());
	}

	@Test
	void shouldListAnimals() throws Exception {
		Animal animal = new Animal("Luna", "Cachorro", 2, "Labrador", AnimalSexo.FEMEA, AnimalPorte.GRANDE, null);
		when(animalService.findAll()).thenReturn(List.of(animal));

		mockMvc.perform(get("/api/animais"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].nome").value("Luna"));
	}

	@Test
	void shouldFindExistingAnimal() throws Exception {
		Animal animal = new Animal("Bob", "Cachorro", 5, "Beagle", AnimalSexo.MACHO, AnimalPorte.MEDIO, null);
		when(animalService.findById(animal.getId().value())).thenReturn(animal);

		mockMvc.perform(get("/api/animais/{id}", animal.getId().value()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.nome").value("Bob"));
	}

	@Test
	void shouldReturnNotFoundForMissingAnimal() throws Exception {
		UUID id = UUID.randomUUID();
		when(animalService.findById(id)).thenThrow(new AnimalNotFoundException());

		mockMvc.perform(get("/api/animais/{id}", id))
				.andExpect(status().isNotFound());
	}

	@Test
	void shouldUpdateExistingAnimal() throws Exception {
		Animal animal = new Animal("Bob", "Cachorro", 6, "Beagle", AnimalSexo.MACHO, AnimalPorte.MEDIO, "Muito dócil");
		when(animalService.update(animal.getId().value(), "Bob", "Cachorro", 6, "Beagle", AnimalSexo.MACHO, AnimalPorte.MEDIO, "Muito dócil"))
				.thenReturn(animal);

		mockMvc.perform(put("/api/animais/{id}", animal.getId().value())
					.contentType(MediaType.APPLICATION_JSON)
					.content("""
							{"nome":"Bob","especie":"Cachorro","idade":6,"raca":"Beagle","sexo":"MACHO","porte":"MEDIO","descricao":"Muito dócil"}
							"""))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.idade").value(6))
				.andExpect(jsonPath("$.descricao").value("Muito dócil"));
	}

	@Test
	void shouldRejectInvalidAnimalUpdate() throws Exception {
		mockMvc.perform(put("/api/animais/{id}", UUID.randomUUID())
					.contentType(MediaType.APPLICATION_JSON)
					.content("""
							{"nome":"","especie":"","idade":-1,"raca":"","sexo":null,"porte":null}
							"""))
				.andExpect(status().isBadRequest());
	}

	@Test
	void shouldReturnNotFoundWhenUpdatingMissingAnimal() throws Exception {
		UUID id = UUID.randomUUID();
		when(animalService.update(eq(id), any(), any(), any(), any(), any(), any(), any()))
				.thenThrow(new AnimalNotFoundException());

		mockMvc.perform(put("/api/animais/{id}", id)
					.contentType(MediaType.APPLICATION_JSON)
					.content(validBody()))
				.andExpect(status().isNotFound());
	}

	@Test
	void shouldDeleteExistingAnimal() throws Exception {
		UUID id = UUID.randomUUID();

		mockMvc.perform(delete("/api/animais/{id}", id))
				.andExpect(status().isNoContent());

		verify(animalService).delete(id);
	}

	@Test
	void shouldReturnNotFoundWhenDeletingMissingAnimal() throws Exception {
		UUID id = UUID.randomUUID();
		doThrow(new AnimalNotFoundException()).when(animalService).delete(id);

		mockMvc.perform(delete("/api/animais/{id}", id))
				.andExpect(status().isNotFound());
	}

	private String validBody() {
		return """
				{"nome":"Caramelo","especie":"Cachorro","idade":3,"raca":"SRD","sexo":"MACHO","porte":"MEDIO","descricao":"Dócil"}
				""";
	}
}
