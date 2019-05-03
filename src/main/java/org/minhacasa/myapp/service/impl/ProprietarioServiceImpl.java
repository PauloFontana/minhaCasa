package org.minhacasa.myapp.service.impl;

import org.minhacasa.myapp.service.ProprietarioService;
import org.minhacasa.myapp.domain.Proprietario;
import org.minhacasa.myapp.repository.ProprietarioRepository;
import org.minhacasa.myapp.service.dto.ProprietarioDTO;
import org.minhacasa.myapp.service.mapper.ProprietarioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Proprietario.
 */
@Service
@Transactional
public class ProprietarioServiceImpl implements ProprietarioService {

    private final Logger log = LoggerFactory.getLogger(ProprietarioServiceImpl.class);

    private final ProprietarioRepository proprietarioRepository;

    private final ProprietarioMapper proprietarioMapper;

    public ProprietarioServiceImpl(ProprietarioRepository proprietarioRepository, ProprietarioMapper proprietarioMapper) {
        this.proprietarioRepository = proprietarioRepository;
        this.proprietarioMapper = proprietarioMapper;
    }

    /**
     * Save a proprietario.
     *
     * @param proprietarioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProprietarioDTO save(ProprietarioDTO proprietarioDTO) {
        log.debug("Request to save Proprietario : {}", proprietarioDTO);
        Proprietario proprietario = proprietarioMapper.toEntity(proprietarioDTO);
        proprietario = proprietarioRepository.save(proprietario);
        return proprietarioMapper.toDto(proprietario);
    }

    /**
     * Get all the proprietarios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProprietarioDTO> findAll() {
        log.debug("Request to get all Proprietarios");
        return proprietarioRepository.findAll().stream()
            .map(proprietarioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one proprietario by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProprietarioDTO> findOne(Long id) {
        log.debug("Request to get Proprietario : {}", id);
        return proprietarioRepository.findById(id)
            .map(proprietarioMapper::toDto);
    }

    /**
     * Delete the proprietario by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Proprietario : {}", id);
        proprietarioRepository.deleteById(id);
    }
}
