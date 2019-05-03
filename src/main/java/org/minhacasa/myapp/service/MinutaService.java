package org.minhacasa.myapp.service;

import org.minhacasa.myapp.service.dto.MinutaDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Minuta.
 */
public interface MinutaService {

    /**
     * Save a minuta.
     *
     * @param minutaDTO the entity to save
     * @return the persisted entity
     */
    MinutaDTO save(MinutaDTO minutaDTO);

    /**
     * Get all the minutas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MinutaDTO> findAll(Pageable pageable);


    /**
     * Get the "id" minuta.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MinutaDTO> findOne(Long id);

    /**
     * Delete the "id" minuta.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
