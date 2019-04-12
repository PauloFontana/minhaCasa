package org.minhacasa.myapp.repository;

import org.minhacasa.myapp.domain.ClienteProprietario;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ClienteProprietario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteProprietarioRepository extends JpaRepository<ClienteProprietario, Long> {

}
