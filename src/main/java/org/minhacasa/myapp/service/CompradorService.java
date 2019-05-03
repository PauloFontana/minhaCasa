package org.minhacasa.myapp.service;

import org.minhacasa.myapp.service.dto.CompradorDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Comprador.
 */
public interface CompradorService {

    /**
     * Save a comprador.
     *
     * @param compradorDTO the entity to save
     * @return the persisted entity
     */
    CompradorDTO save(CompradorDTO compradorDTO);

    /**
     * Get all the compradors.
     *
     * @return the list of entities
     */
    List<CompradorDTO> findAll();


    /**
     * Get the "id" comprador.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CompradorDTO> findOne(Long id);

    /**
     * Delete the "id" comprador.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
