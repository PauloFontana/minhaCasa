package org.minhacasa.myapp.repository;

import org.minhacasa.myapp.domain.Comprador;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Comprador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompradorRepository extends JpaRepository<Comprador, Long> {

}
