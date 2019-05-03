package org.minhacasa.myapp.service;

import org.minhacasa.myapp.service.dto.CorretorDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Corretor.
 */
public interface CorretorService {

    /**
     * Save a corretor.
     *
     * @param corretorDTO the entity to save
     * @return the persisted entity
     */
    CorretorDTO save(CorretorDTO corretorDTO);

    /**
     * Get all the corretors.
     *
     * @return the list of entities
     */
    List<CorretorDTO> findAll();


    /**
     * Get the "id" corretor.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CorretorDTO> findOne(Long id);

    /**
     * Delete the "id" corretor.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
