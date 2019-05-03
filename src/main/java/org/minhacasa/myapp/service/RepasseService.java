package org.minhacasa.myapp.service;

import org.minhacasa.myapp.service.dto.RepasseDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Repasse.
 */
public interface RepasseService {

    /**
     * Save a repasse.
     *
     * @param repasseDTO the entity to save
     * @return the persisted entity
     */
    RepasseDTO save(RepasseDTO repasseDTO);

    /**
     * Get all the repasses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RepasseDTO> findAll(Pageable pageable);


    /**
     * Get the "id" repasse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<RepasseDTO> findOne(Long id);

    /**
     * Delete the "id" repasse.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
