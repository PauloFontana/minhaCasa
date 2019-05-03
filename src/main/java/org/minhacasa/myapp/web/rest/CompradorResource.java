package org.minhacasa.myapp.web.rest;
import org.minhacasa.myapp.service.CompradorService;
import org.minhacasa.myapp.web.rest.errors.BadRequestAlertException;
import org.minhacasa.myapp.web.rest.util.HeaderUtil;
import org.minhacasa.myapp.service.dto.CompradorDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Comprador.
 */
@RestController
@RequestMapping("/api")
public class CompradorResource {

    private final Logger log = LoggerFactory.getLogger(CompradorResource.class);

    private static final String ENTITY_NAME = "comprador";

    private final CompradorService compradorService;

    public CompradorResource(CompradorService compradorService) {
        this.compradorService = compradorService;
    }

    /**
     * POST  /compradors : Create a new comprador.
     *
     * @param compradorDTO the compradorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new compradorDTO, or with status 400 (Bad Request) if the comprador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/compradors")
    public ResponseEntity<CompradorDTO> createComprador(@RequestBody CompradorDTO compradorDTO) throws URISyntaxException {
        log.debug("REST request to save Comprador : {}", compradorDTO);
        if (compradorDTO.getId() != null) {
            throw new BadRequestAlertException("A new comprador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompradorDTO result = compradorService.save(compradorDTO);
        return ResponseEntity.created(new URI("/api/compradors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /compradors : Updates an existing comprador.
     *
     * @param compradorDTO the compradorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated compradorDTO,
     * or with status 400 (Bad Request) if the compradorDTO is not valid,
     * or with status 500 (Internal Server Error) if the compradorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/compradors")
    public ResponseEntity<CompradorDTO> updateComprador(@RequestBody CompradorDTO compradorDTO) throws URISyntaxException {
        log.debug("REST request to update Comprador : {}", compradorDTO);
        if (compradorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompradorDTO result = compradorService.save(compradorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, compradorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /compradors : get all the compradors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of compradors in body
     */
    @GetMapping("/compradors")
    public List<CompradorDTO> getAllCompradors() {
        log.debug("REST request to get all Compradors");
        return compradorService.findAll();
    }

    /**
     * GET  /compradors/:id : get the "id" comprador.
     *
     * @param id the id of the compradorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the compradorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/compradors/{id}")
    public ResponseEntity<CompradorDTO> getComprador(@PathVariable Long id) {
        log.debug("REST request to get Comprador : {}", id);
        Optional<CompradorDTO> compradorDTO = compradorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(compradorDTO);
    }

    /**
     * DELETE  /compradors/:id : delete the "id" comprador.
     *
     * @param id the id of the compradorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/compradors/{id}")
    public ResponseEntity<Void> deleteComprador(@PathVariable Long id) {
        log.debug("REST request to delete Comprador : {}", id);
        compradorService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
