package org.minhacasa.myapp.repository;

import org.minhacasa.myapp.domain.Imobiliaria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Imobiliaria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImobiliariaRepository extends JpaRepository<Imobiliaria, Long> {

}
