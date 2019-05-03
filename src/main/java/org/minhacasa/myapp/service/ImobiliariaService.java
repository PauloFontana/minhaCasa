package org.minhacasa.myapp.service;

import org.minhacasa.myapp.service.dto.ImobiliariaDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Imobiliaria.
 */
public interface ImobiliariaService {

    /**
     * Save a imobiliaria.
     *
     * @param imobiliariaDTO the entity to save
     * @return the persisted entity
     */
    ImobiliariaDTO save(ImobiliariaDTO imobiliariaDTO);

    /**
     * Get all the imobiliarias.
     *
     * @return the list of entities
     */
    List<ImobiliariaDTO> findAll();


    /**
     * Get the "id" imobiliaria.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ImobiliariaDTO> findOne(Long id);

    /**
     * Delete the "id" imobiliaria.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
