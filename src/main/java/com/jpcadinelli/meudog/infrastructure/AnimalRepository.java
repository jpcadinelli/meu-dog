package com.jpcadinelli.meudog.infrastructure;

import com.jpcadinelli.meudog.domain.Animal;
import com.jpcadinelli.meudog.domain.AnimalId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, AnimalId> {
}
