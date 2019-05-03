package org.minhacasa.myapp.service.impl;

import org.minhacasa.myapp.service.RepasseService;
import org.minhacasa.myapp.domain.Repasse;
import org.minhacasa.myapp.repository.RepasseRepository;
import org.minhacasa.myapp.service.dto.RepasseDTO;
import org.minhacasa.myapp.service.mapper.RepasseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Repasse.
 */
@Service
@Transactional
public class RepasseServiceImpl implements RepasseService {

    private final Logger log = LoggerFactory.getLogger(RepasseServiceImpl.class);

    private final RepasseRepository repasseRepository;

    private final RepasseMapper repasseMapper;

    public RepasseServiceImpl(RepasseRepository repasseRepository, RepasseMapper repasseMapper) {
        this.repasseRepository = repasseRepository;
        this.repasseMapper = repasseMapper;
    }

    /**
     * Save a repasse.
     *
     * @param repasseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RepasseDTO save(RepasseDTO repasseDTO) {
        log.debug("Request to save Repasse : {}", repasseDTO);
        Repasse repasse = repasseMapper.toEntity(repasseDTO);
        repasse = repasseRepository.save(repasse);
        return repasseMapper.toDto(repasse);
    }

    /**
     * Get all the repasses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RepasseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Repasses");
        return repasseRepository.findAll(pageable)
            .map(repasseMapper::toDto);
    }


    /**
     * Get one repasse by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RepasseDTO> findOne(Long id) {
        log.debug("Request to get Repasse : {}", id);
        return repasseRepository.findById(id)
            .map(repasseMapper::toDto);
    }

    /**
     * Delete the repasse by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Repasse : {}", id);
        repasseRepository.deleteById(id);
    }
}
