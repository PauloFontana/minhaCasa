package org.minhacasa.myapp.service.impl;

import org.minhacasa.myapp.service.VisitaService;
import org.minhacasa.myapp.domain.Visita;
import org.minhacasa.myapp.repository.VisitaRepository;
import org.minhacasa.myapp.service.dto.VisitaDTO;
import org.minhacasa.myapp.service.mapper.VisitaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Visita.
 */
@Service
@Transactional
public class VisitaServiceImpl implements VisitaService {

    private final Logger log = LoggerFactory.getLogger(VisitaServiceImpl.class);

    private final VisitaRepository visitaRepository;

    private final VisitaMapper visitaMapper;

    public VisitaServiceImpl(VisitaRepository visitaRepository, VisitaMapper visitaMapper) {
        this.visitaRepository = visitaRepository;
        this.visitaMapper = visitaMapper;
    }

    /**
     * Save a visita.
     *
     * @param visitaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public VisitaDTO save(VisitaDTO visitaDTO) {
        log.debug("Request to save Visita : {}", visitaDTO);
        Visita visita = visitaMapper.toEntity(visitaDTO);
        visita = visitaRepository.save(visita);
        return visitaMapper.toDto(visita);
    }

    /**
     * Get all the visitas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<VisitaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Visitas");
        return visitaRepository.findAll(pageable)
            .map(visitaMapper::toDto);
    }


    /**
     * Get one visita by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<VisitaDTO> findOne(Long id) {
        log.debug("Request to get Visita : {}", id);
        return visitaRepository.findById(id)
            .map(visitaMapper::toDto);
    }

    /**
     * Delete the visita by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Visita : {}", id);
        visitaRepository.deleteById(id);
    }
}
