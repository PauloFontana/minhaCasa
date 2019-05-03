package org.minhacasa.myapp.service;

import org.minhacasa.myapp.service.dto.ImovelDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Imovel.
 */
public interface ImovelService {

    /**
     * Save a imovel.
     *
     * @param imovelDTO the entity to save
     * @return the persisted entity
     */
    ImovelDTO save(ImovelDTO imovelDTO);

    /**
     * Get all the imovels.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ImovelDTO> findAll(Pageable pageable);


    /**
     * Get the "id" imovel.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ImovelDTO> findOne(Long id);

    /**
     * Delete the "id" imovel.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
