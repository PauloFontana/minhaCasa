package org.minhacasa.myapp.service.impl;

import org.minhacasa.myapp.service.ImovelService;
import org.minhacasa.myapp.domain.Imovel;
import org.minhacasa.myapp.repository.ImovelRepository;
import org.minhacasa.myapp.service.dto.ImovelDTO;
import org.minhacasa.myapp.service.mapper.ImovelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Imovel.
 */
@Service
@Transactional
public class ImovelServiceImpl implements ImovelService {

    private final Logger log = LoggerFactory.getLogger(ImovelServiceImpl.class);

    private final ImovelRepository imovelRepository;

    private final ImovelMapper imovelMapper;

    public ImovelServiceImpl(ImovelRepository imovelRepository, ImovelMapper imovelMapper) {
        this.imovelRepository = imovelRepository;
        this.imovelMapper = imovelMapper;
    }

    /**
     * Save a imovel.
     *
     * @param imovelDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ImovelDTO save(ImovelDTO imovelDTO) {
        log.debug("Request to save Imovel : {}", imovelDTO);
        Imovel imovel = imovelMapper.toEntity(imovelDTO);
        imovel = imovelRepository.save(imovel);
        return imovelMapper.toDto(imovel);
    }

    /**
     * Get all the imovels.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ImovelDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Imovels");
        return imovelRepository.findAll(pageable)
            .map(imovelMapper::toDto);
    }


    /**
     * Get one imovel by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ImovelDTO> findOne(Long id) {
        log.debug("Request to get Imovel : {}", id);
        return imovelRepository.findById(id)
            .map(imovelMapper::toDto);
    }

    /**
     * Delete the imovel by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Imovel : {}", id);
        imovelRepository.deleteById(id);
    }
}
