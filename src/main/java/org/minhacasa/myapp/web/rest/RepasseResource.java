package org.minhacasa.myapp.web.rest;
import org.minhacasa.myapp.service.RepasseService;
import org.minhacasa.myapp.web.rest.errors.BadRequestAlertException;
import org.minhacasa.myapp.web.rest.util.HeaderUtil;
import org.minhacasa.myapp.web.rest.util.PaginationUtil;
import org.minhacasa.myapp.service.dto.RepasseDTO;
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
 * REST controller for managing Repasse.
 */
@RestController
@RequestMapping("/api")
public class RepasseResource {

    private final Logger log = LoggerFactory.getLogger(RepasseResource.class);

    private static final String ENTITY_NAME = "repasse";

    private final RepasseService repasseService;

    public RepasseResource(RepasseService repasseService) {
        this.repasseService = repasseService;
    }

    /**
     * POST  /repasses : Create a new repasse.
     *
     * @param repasseDTO the repasseDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new repasseDTO, or with status 400 (Bad Request) if the repasse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/repasses")
    public ResponseEntity<RepasseDTO> createRepasse(@RequestBody RepasseDTO repasseDTO) throws URISyntaxException {
        log.debug("REST request to save Repasse : {}", repasseDTO);
        if (repasseDTO.getId() != null) {
            throw new BadRequestAlertException("A new repasse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RepasseDTO result = repasseService.save(repasseDTO);
        return ResponseEntity.created(new URI("/api/repasses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /repasses : Updates an existing repasse.
     *
     * @param repasseDTO the repasseDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated repasseDTO,
     * or with status 400 (Bad Request) if the repasseDTO is not valid,
     * or with status 500 (Internal Server Error) if the repasseDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/repasses")
    public ResponseEntity<RepasseDTO> updateRepasse(@RequestBody RepasseDTO repasseDTO) throws URISyntaxException {
        log.debug("REST request to update Repasse : {}", repasseDTO);
        if (repasseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RepasseDTO result = repasseService.save(repasseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, repasseDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /repasses : get all the repasses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of repasses in body
     */
    @GetMapping("/repasses")
    public ResponseEntity<List<RepasseDTO>> getAllRepasses(Pageable pageable) {
        log.debug("REST request to get a page of Repasses");
        Page<RepasseDTO> page = repasseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/repasses");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /repasses/:id : get the "id" repasse.
     *
     * @param id the id of the repasseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the repasseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/repasses/{id}")
    public ResponseEntity<RepasseDTO> getRepasse(@PathVariable Long id) {
        log.debug("REST request to get Repasse : {}", id);
        Optional<RepasseDTO> repasseDTO = repasseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(repasseDTO);
    }

    /**
     * DELETE  /repasses/:id : delete the "id" repasse.
     *
     * @param id the id of the repasseDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/repasses/{id}")
    public ResponseEntity<Void> deleteRepasse(@PathVariable Long id) {
        log.debug("REST request to delete Repasse : {}", id);
        repasseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
