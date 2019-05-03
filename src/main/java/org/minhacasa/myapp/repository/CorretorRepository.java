package org.minhacasa.myapp.repository;

import org.minhacasa.myapp.domain.Corretor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Corretor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CorretorRepository extends JpaRepository<Corretor, Long> {

}
