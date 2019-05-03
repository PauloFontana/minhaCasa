package org.minhacasa.myapp.service;

import org.minhacasa.myapp.service.dto.VisitaDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Visita.
 */
public interface VisitaService {

    /**
     * Save a visita.
     *
     * @param visitaDTO the entity to save
     * @return the persisted entity
     */
    VisitaDTO save(VisitaDTO visitaDTO);

    /**
     * Get all the visitas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<VisitaDTO> findAll(Pageable pageable);


    /**
     * Get the "id" visita.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<VisitaDTO> findOne(Long id);

    /**
     * Delete the "id" visita.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
