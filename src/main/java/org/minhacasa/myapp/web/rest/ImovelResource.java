package org.minhacasa.myapp.web.rest;
import org.minhacasa.myapp.service.ImovelService;
import org.minhacasa.myapp.web.rest.errors.BadRequestAlertException;
import org.minhacasa.myapp.web.rest.util.HeaderUtil;
import org.minhacasa.myapp.web.rest.util.PaginationUtil;
import org.minhacasa.myapp.service.dto.ImovelDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Imovel.
 */
@RestController
@RequestMapping("/api")
public class ImovelResource {

    private final Logger log = LoggerFactory.getLogger(ImovelResource.class);

    private static final String ENTITY_NAME = "imovel";

    private final ImovelService imovelService;

    public ImovelResource(ImovelService imovelService) {
        this.imovelService = imovelService;
    }

    /**
     * POST  /imovels : Create a new imovel.
     *
     * @param imovelDTO the imovelDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imovelDTO, or with status 400 (Bad Request) if the imovel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/imovels")
    public ResponseEntity<ImovelDTO> createImovel(@RequestBody ImovelDTO imovelDTO) throws URISyntaxException {
        log.debug("REST request to save Imovel : {}", imovelDTO);
        if (imovelDTO.getId() != null) {
            throw new BadRequestAlertException("A new imovel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ImovelDTO result = imovelService.save(imovelDTO);
        return ResponseEntity.created(new URI("/api/imovels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /imovels : Updates an existing imovel.
     *
     * @param imovelDTO the imovelDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imovelDTO,
     * or with status 400 (Bad Request) if the imovelDTO is not valid,
     * or with status 500 (Internal Server Error) if the imovelDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/imovels")
    public ResponseEntity<ImovelDTO> updateImovel(@RequestBody ImovelDTO imovelDTO) throws URISyntaxException {
        log.debug("REST request to update Imovel : {}", imovelDTO);
        if (imovelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ImovelDTO result = imovelService.save(imovelDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imovelDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /imovels : get all the imovels.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of imovels in body
     */
    @GetMapping("/imovels")
    public ResponseEntity<List<ImovelDTO>> getAllImovels(Pageable pageable) {
        log.debug("REST request to get a page of Imovels");
        Page<ImovelDTO> page = imovelService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/imovels");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /imovels/:id : get the "id" imovel.
     *
     * @param id the id of the imovelDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imovelDTO, or with status 404 (Not Found)
     */
    @GetMapping("/imovels/{id}")
    public ResponseEntity<ImovelDTO> getImovel(@PathVariable Long id) {
        log.debug("REST request to get Imovel : {}", id);
        Optional<ImovelDTO> imovelDTO = imovelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(imovelDTO);
    }

    /**
     * DELETE  /imovels/:id : delete the "id" imovel.
     *
     * @param id the id of the imovelDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/imovels/{id}")
    public ResponseEntity<Void> deleteImovel(@PathVariable Long id) {
        log.debug("REST request to delete Imovel : {}", id);
        imovelService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
