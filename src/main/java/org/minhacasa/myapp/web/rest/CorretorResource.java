package org.minhacasa.myapp.web.rest;
import org.minhacasa.myapp.service.CorretorService;
import org.minhacasa.myapp.web.rest.errors.BadRequestAlertException;
import org.minhacasa.myapp.web.rest.util.HeaderUtil;
import org.minhacasa.myapp.service.dto.CorretorDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Corretor.
 */
@RestController
@RequestMapping("/api")
public class CorretorResource {

    private final Logger log = LoggerFactory.getLogger(CorretorResource.class);

    private static final String ENTITY_NAME = "corretor";

    private final CorretorService corretorService;

    public CorretorResource(CorretorService corretorService) {
        this.corretorService = corretorService;
    }

    /**
     * POST  /corretors : Create a new corretor.
     *
     * @param corretorDTO the corretorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new corretorDTO, or with status 400 (Bad Request) if the corretor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/corretors")
    public ResponseEntity<CorretorDTO> createCorretor(@Valid @RequestBody CorretorDTO corretorDTO) throws URISyntaxException {
        log.debug("REST request to save Corretor : {}", corretorDTO);
        if (corretorDTO.getId() != null) {
            throw new BadRequestAlertException("A new corretor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CorretorDTO result = corretorService.save(corretorDTO);
        return ResponseEntity.created(new URI("/api/corretors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /corretors : Updates an existing corretor.
     *
     * @param corretorDTO the corretorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated corretorDTO,
     * or with status 400 (Bad Request) if the corretorDTO is not valid,
     * or with status 500 (Internal Server Error) if the corretorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/corretors")
    public ResponseEntity<CorretorDTO> updateCorretor(@Valid @RequestBody CorretorDTO corretorDTO) throws URISyntaxException {
        log.debug("REST request to update Corretor : {}", corretorDTO);
        if (corretorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CorretorDTO result = corretorService.save(corretorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, corretorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /corretors : get all the corretors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of corretors in body
     */
    @GetMapping("/corretors")
    public List<CorretorDTO> getAllCorretors() {
        log.debug("REST request to get all Corretors");
        return corretorService.findAll();
    }

    /**
     * GET  /corretors/:id : get the "id" corretor.
     *
     * @param id the id of the corretorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the corretorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/corretors/{id}")
    public ResponseEntity<CorretorDTO> getCorretor(@PathVariable Long id) {
        log.debug("REST request to get Corretor : {}", id);
        Optional<CorretorDTO> corretorDTO = corretorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(corretorDTO);
    }

    /**
     * DELETE  /corretors/:id : delete the "id" corretor.
     *
     * @param id the id of the corretorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/corretors/{id}")
    public ResponseEntity<Void> deleteCorretor(@PathVariable Long id) {
        log.debug("REST request to delete Corretor : {}", id);
        corretorService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
