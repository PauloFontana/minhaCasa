package org.minhacasa.myapp.service;

import org.minhacasa.myapp.service.dto.PagamentoDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Pagamento.
 */
public interface PagamentoService {

    /**
     * Save a pagamento.
     *
     * @param pagamentoDTO the entity to save
     * @return the persisted entity
     */
    PagamentoDTO save(PagamentoDTO pagamentoDTO);

    /**
     * Get all the pagamentos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PagamentoDTO> findAll(Pageable pageable);


    /**
     * Get the "id" pagamento.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PagamentoDTO> findOne(Long id);

    /**
     * Delete the "id" pagamento.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
