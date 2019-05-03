package org.minhacasa.myapp.service.impl;

import org.minhacasa.myapp.service.ImobiliariaService;
import org.minhacasa.myapp.domain.Imobiliaria;
import org.minhacasa.myapp.repository.ImobiliariaRepository;
import org.minhacasa.myapp.service.dto.ImobiliariaDTO;
import org.minhacasa.myapp.service.mapper.ImobiliariaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Imobiliaria.
 */
@Service
@Transactional
public class ImobiliariaServiceImpl implements ImobiliariaService {

    private final Logger log = LoggerFactory.getLogger(ImobiliariaServiceImpl.class);

    private final ImobiliariaRepository imobiliariaRepository;

    private final ImobiliariaMapper imobiliariaMapper;

    public ImobiliariaServiceImpl(ImobiliariaRepository imobiliariaRepository, ImobiliariaMapper imobiliariaMapper) {
        this.imobiliariaRepository = imobiliariaRepository;
        this.imobiliariaMapper = imobiliariaMapper;
    }

    /**
     * Save a imobiliaria.
     *
     * @param imobiliariaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ImobiliariaDTO save(ImobiliariaDTO imobiliariaDTO) {
        log.debug("Request to save Imobiliaria : {}", imobiliariaDTO);
        Imobiliaria imobiliaria = imobiliariaMapper.toEntity(imobiliariaDTO);
        imobiliaria = imobiliariaRepository.save(imobiliaria);
        return imobiliariaMapper.toDto(imobiliaria);
    }

    /**
     * Get all the imobiliarias.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ImobiliariaDTO> findAll() {
        log.debug("Request to get all Imobiliarias");
        return imobiliariaRepository.findAll().stream()
            .map(imobiliariaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one imobiliaria by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ImobiliariaDTO> findOne(Long id) {
        log.debug("Request to get Imobiliaria : {}", id);
        return imobiliariaRepository.findById(id)
            .map(imobiliariaMapper::toDto);
    }

    /**
     * Delete the imobiliaria by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Imobiliaria : {}", id);
        imobiliariaRepository.deleteById(id);
    }
}
