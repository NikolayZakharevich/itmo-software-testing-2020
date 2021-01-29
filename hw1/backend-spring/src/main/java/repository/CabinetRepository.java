package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import domain.CabinetsEntity;

public interface CabinetRepository extends JpaRepository<CabinetsEntity, Long> {
}
