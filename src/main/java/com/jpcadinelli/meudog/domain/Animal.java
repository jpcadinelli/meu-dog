package com.jpcadinelli.meudog.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "animais", schema = "\"meu-dog\"")
public class Animal {

	@EmbeddedId
	private AnimalId id;

	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private String especie;

	@Column(nullable = false)
	private Integer idade;

	@Column(nullable = false)
	private String raca;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private AnimalSexo sexo;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private AnimalPorte porte;

	private String descricao;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private StatusAdocao status;

	@Column(name = "data_cadastro", nullable = false)
	private LocalDateTime dataCadastro;

	protected Animal() {
	}

	public Animal(String nome, String especie, Integer idade, String raca, AnimalSexo sexo, AnimalPorte porte, String descricao) {
		this.id = AnimalId.newId();
		this.nome = nome;
		this.especie = especie;
		this.idade = idade;
		this.raca = raca;
		this.sexo = sexo;
		this.porte = porte;
		this.descricao = descricao;
		this.status = StatusAdocao.DISPONIVEL;
		this.dataCadastro = LocalDateTime.now();
	}

	public void update(String nome, String especie, Integer idade, String raca, AnimalSexo sexo, AnimalPorte porte, String descricao) {
		this.nome = nome;
		this.especie = especie;
		this.idade = idade;
		this.raca = raca;
		this.sexo = sexo;
		this.porte = porte;
		this.descricao = descricao;
	}

	public AnimalId getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public String getEspecie() {
		return especie;
	}

	public Integer getIdade() {
		return idade;
	}

	public String getRaca() {
		return raca;
	}

	public AnimalSexo getSexo() {
		return sexo;
	}

	public AnimalPorte getPorte() {
		return porte;
	}

	public String getDescricao() {
		return descricao;
	}

	public StatusAdocao getStatus() {
		return status;
	}

	public LocalDateTime getDataCadastro() {
		return dataCadastro;
	}
}
