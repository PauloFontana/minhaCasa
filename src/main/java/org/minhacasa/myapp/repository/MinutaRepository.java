package org.minhacasa.myapp.repository;

import org.minhacasa.myapp.domain.Minuta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Minuta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MinutaRepository extends JpaRepository<Minuta, Long> {

}
