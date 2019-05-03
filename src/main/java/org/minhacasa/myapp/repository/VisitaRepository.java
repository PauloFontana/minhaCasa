package org.minhacasa.myapp.repository;

import org.minhacasa.myapp.domain.Visita;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Visita entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisitaRepository extends JpaRepository<Visita, Long> {

}
