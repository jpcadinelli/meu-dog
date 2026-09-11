package com.jpcadinelli.meudog.web;

import com.jpcadinelli.meudog.domain.AnimalPorte;
import com.jpcadinelli.meudog.domain.AnimalSexo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record AnimalRequest(
		@NotBlank(message = "O nome é obrigatério")
		String nome,
		@NotBlank(message = "A espécie é obrigatória")
		String especie,
		@NotNull(message = "A idade é obrigatória")
		@PositiveOrZero(message = "A idade não pode ser negativa")
		Integer idade,
		@NotBlank(message = "A raça é obrigatória")
		String raca,
		@NotNull(message = "O sexo é obrigatório")
		AnimalSexo sexo,
		@NotNull(message = "O porte é obrigatório")
		AnimalPorte porte,
		String descricao
) {
}
