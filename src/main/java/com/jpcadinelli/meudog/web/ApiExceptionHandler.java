package com.jpcadinelli.meudog.web;

import com.jpcadinelli.meudog.application.AnimalNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

	@ExceptionHandler(AnimalNotFoundException.class)
	public ResponseEntity<Void> handleAnimalNotFound() {
		return ResponseEntity.notFound().build();
	}
}
