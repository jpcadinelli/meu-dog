package com.jpcadinelli.meudog.web;

import com.jpcadinelli.meudog.domain.Animal;
import org.springframework.data.domain.Page;

import java.util.List;

public record AnimalPageResponse(
		List<AnimalResponse> content,
		int number,
		int size,
		int totalPages,
		long totalElements,
		boolean first,
		boolean last
) {

	public static AnimalPageResponse from(Page<Animal> page) {
		return new AnimalPageResponse(
				page.getContent().stream().map(AnimalResponse::from).toList(),
				page.getNumber(),
				page.getSize(),
				page.getTotalPages(),
				page.getTotalElements(),
				page.isFirst(),
				page.isLast()
		);
	}
}
