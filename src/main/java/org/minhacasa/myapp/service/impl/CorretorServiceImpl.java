package org.minhacasa.myapp.service.impl;

import org.minhacasa.myapp.service.CorretorService;
import org.minhacasa.myapp.domain.Corretor;
import org.minhacasa.myapp.repository.CorretorRepository;
import org.minhacasa.myapp.service.dto.CorretorDTO;
import org.minhacasa.myapp.service.mapper.CorretorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Corretor.
 */
@Service
@Transactional
public class CorretorServiceImpl implements CorretorService {

    private final Logger log = LoggerFactory.getLogger(CorretorServiceImpl.class);

    private final CorretorRepository corretorRepository;

    private final CorretorMapper corretorMapper;

    public CorretorServiceImpl(CorretorRepository corretorRepository, CorretorMapper corretorMapper) {
        this.corretorRepository = corretorRepository;
        this.corretorMapper = corretorMapper;
    }

    /**
     * Save a corretor.
     *
     * @param corretorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CorretorDTO save(CorretorDTO corretorDTO) {
        log.debug("Request to save Corretor : {}", corretorDTO);
        Corretor corretor = corretorMapper.toEntity(corretorDTO);
        corretor = corretorRepository.save(corretor);
        return corretorMapper.toDto(corretor);
    }

    /**
     * Get all the corretors.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CorretorDTO> findAll() {
        log.debug("Request to get all Corretors");
        return corretorRepository.findAll().stream()
            .map(corretorMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one corretor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CorretorDTO> findOne(Long id) {
        log.debug("Request to get Corretor : {}", id);
        return corretorRepository.findById(id)
            .map(corretorMapper::toDto);
    }

    /**
     * Delete the corretor by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Corretor : {}", id);
        corretorRepository.deleteById(id);
    }
}
