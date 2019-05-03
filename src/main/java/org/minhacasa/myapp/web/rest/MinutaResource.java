package org.minhacasa.myapp.web.rest;
import org.minhacasa.myapp.service.MinutaService;
import org.minhacasa.myapp.web.rest.errors.BadRequestAlertException;
import org.minhacasa.myapp.web.rest.util.HeaderUtil;
import org.minhacasa.myapp.web.rest.util.PaginationUtil;
import org.minhacasa.myapp.service.dto.MinutaDTO;
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
 * REST controller for managing Minuta.
 */
@RestController
@RequestMapping("/api")
public class MinutaResource {

    private final Logger log = LoggerFactory.getLogger(MinutaResource.class);

    private static final String ENTITY_NAME = "minuta";

    private final MinutaService minutaService;

    public MinutaResource(MinutaService minutaService) {
        this.minutaService = minutaService;
    }

    /**
     * POST  /minutas : Create a new minuta.
     *
     * @param minutaDTO the minutaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new minutaDTO, or with status 400 (Bad Request) if the minuta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/minutas")
    public ResponseEntity<MinutaDTO> createMinuta(@RequestBody MinutaDTO minutaDTO) throws URISyntaxException {
        log.debug("REST request to save Minuta : {}", minutaDTO);
        if (minutaDTO.getId() != null) {
            throw new BadRequestAlertException("A new minuta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MinutaDTO result = minutaService.save(minutaDTO);
        return ResponseEntity.created(new URI("/api/minutas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /minutas : Updates an existing minuta.
     *
     * @param minutaDTO the minutaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated minutaDTO,
     * or with status 400 (Bad Request) if the minutaDTO is not valid,
     * or with status 500 (Internal Server Error) if the minutaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/minutas")
    public ResponseEntity<MinutaDTO> updateMinuta(@RequestBody MinutaDTO minutaDTO) throws URISyntaxException {
        log.debug("REST request to update Minuta : {}", minutaDTO);
        if (minutaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MinutaDTO result = minutaService.save(minutaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, minutaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /minutas : get all the minutas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of minutas in body
     */
    @GetMapping("/minutas")
    public ResponseEntity<List<MinutaDTO>> getAllMinutas(Pageable pageable) {
        log.debug("REST request to get a page of Minutas");
        Page<MinutaDTO> page = minutaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/minutas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /minutas/:id : get the "id" minuta.
     *
     * @param id the id of the minutaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the minutaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/minutas/{id}")
    public ResponseEntity<MinutaDTO> getMinuta(@PathVariable Long id) {
        log.debug("REST request to get Minuta : {}", id);
        Optional<MinutaDTO> minutaDTO = minutaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(minutaDTO);
    }

    /**
     * DELETE  /minutas/:id : delete the "id" minuta.
     *
     * @param id the id of the minutaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/minutas/{id}")
    public ResponseEntity<Void> deleteMinuta(@PathVariable Long id) {
        log.debug("REST request to delete Minuta : {}", id);
        minutaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
