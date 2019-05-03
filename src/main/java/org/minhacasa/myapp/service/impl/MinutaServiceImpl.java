package org.minhacasa.myapp.service.impl;

import org.minhacasa.myapp.service.MinutaService;
import org.minhacasa.myapp.domain.Minuta;
import org.minhacasa.myapp.repository.MinutaRepository;
import org.minhacasa.myapp.service.dto.MinutaDTO;
import org.minhacasa.myapp.service.mapper.MinutaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Minuta.
 */
@Service
@Transactional
public class MinutaServiceImpl implements MinutaService {

    private final Logger log = LoggerFactory.getLogger(MinutaServiceImpl.class);

    private final MinutaRepository minutaRepository;

    private final MinutaMapper minutaMapper;

    public MinutaServiceImpl(MinutaRepository minutaRepository, MinutaMapper minutaMapper) {
        this.minutaRepository = minutaRepository;
        this.minutaMapper = minutaMapper;
    }

    /**
     * Save a minuta.
     *
     * @param minutaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MinutaDTO save(MinutaDTO minutaDTO) {
        log.debug("Request to save Minuta : {}", minutaDTO);
        Minuta minuta = minutaMapper.toEntity(minutaDTO);
        minuta = minutaRepository.save(minuta);
        return minutaMapper.toDto(minuta);
    }

    /**
     * Get all the minutas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MinutaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Minutas");
        return minutaRepository.findAll(pageable)
            .map(minutaMapper::toDto);
    }


    /**
     * Get one minuta by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MinutaDTO> findOne(Long id) {
        log.debug("Request to get Minuta : {}", id);
        return minutaRepository.findById(id)
            .map(minutaMapper::toDto);
    }

    /**
     * Delete the minuta by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Minuta : {}", id);
        minutaRepository.deleteById(id);
    }
}
