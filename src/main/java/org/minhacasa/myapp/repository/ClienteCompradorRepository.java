package org.minhacasa.myapp.repository;

import org.minhacasa.myapp.domain.ClienteComprador;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ClienteComprador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteCompradorRepository extends JpaRepository<ClienteComprador, Long> {

}
