package org.minhacasa.myapp.repository;

import org.minhacasa.myapp.domain.Repasse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Repasse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepasseRepository extends JpaRepository<Repasse, Long> {

}
