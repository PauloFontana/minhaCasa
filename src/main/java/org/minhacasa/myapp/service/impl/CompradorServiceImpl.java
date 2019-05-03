package org.minhacasa.myapp.service.impl;

import org.minhacasa.myapp.service.CompradorService;
import org.minhacasa.myapp.domain.Comprador;
import org.minhacasa.myapp.repository.CompradorRepository;
import org.minhacasa.myapp.service.dto.CompradorDTO;
import org.minhacasa.myapp.service.mapper.CompradorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Comprador.
 */
@Service
@Transactional
public class CompradorServiceImpl implements CompradorService {

    private final Logger log = LoggerFactory.getLogger(CompradorServiceImpl.class);

    private final CompradorRepository compradorRepository;

    private final CompradorMapper compradorMapper;

    public CompradorServiceImpl(CompradorRepository compradorRepository, CompradorMapper compradorMapper) {
        this.compradorRepository = compradorRepository;
        this.compradorMapper = compradorMapper;
    }

    /**
     * Save a comprador.
     *
     * @param compradorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CompradorDTO save(CompradorDTO compradorDTO) {
        log.debug("Request to save Comprador : {}", compradorDTO);
        Comprador comprador = compradorMapper.toEntity(compradorDTO);
        comprador = compradorRepository.save(comprador);
        return compradorMapper.toDto(comprador);
    }

    /**
     * Get all the compradors.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CompradorDTO> findAll() {
        log.debug("Request to get all Compradors");
        return compradorRepository.findAll().stream()
            .map(compradorMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one comprador by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CompradorDTO> findOne(Long id) {
        log.debug("Request to get Comprador : {}", id);
        return compradorRepository.findById(id)
            .map(compradorMapper::toDto);
    }

    /**
     * Delete the comprador by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Comprador : {}", id);
        compradorRepository.deleteById(id);
    }
}
