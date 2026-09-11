package com.jpcadinelli.meudog.web;

import com.jpcadinelli.meudog.domain.Animal;
import com.jpcadinelli.meudog.domain.AnimalPorte;
import com.jpcadinelli.meudog.domain.AnimalSexo;
import com.jpcadinelli.meudog.domain.StatusAdocao;

import java.time.LocalDateTime;
import java.util.UUID;

public record AnimalResponse(
		UUID id,
		String nome,
		String especie,
		Integer idade,
		String raca,
		AnimalSexo sexo,
		AnimalPorte porte,
		String descricao,
		StatusAdocao status,
		LocalDateTime dataCadastro
) {

	public static AnimalResponse from(Animal animal) {
		return new AnimalResponse(
				animal.getId().value(),
				animal.getNome(),
				animal.getEspecie(),
				animal.getIdade(),
				animal.getRaca(),
				animal.getSexo(),
				animal.getPorte(),
				animal.getDescricao(),
				animal.getStatus(),
				animal.getDataCadastro()
		);
	}
}
