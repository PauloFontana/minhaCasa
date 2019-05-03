package org.minhacasa.myapp.web.rest;
import org.minhacasa.myapp.service.ProprietarioService;
import org.minhacasa.myapp.web.rest.errors.BadRequestAlertException;
import org.minhacasa.myapp.web.rest.util.HeaderUtil;
import org.minhacasa.myapp.service.dto.ProprietarioDTO;
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
 * REST controller for managing Proprietario.
 */
@RestController
@RequestMapping("/api")
public class ProprietarioResource {

    private final Logger log = LoggerFactory.getLogger(ProprietarioResource.class);

    private static final String ENTITY_NAME = "proprietario";

    private final ProprietarioService proprietarioService;

    public ProprietarioResource(ProprietarioService proprietarioService) {
        this.proprietarioService = proprietarioService;
    }

    /**
     * POST  /proprietarios : Create a new proprietario.
     *
     * @param proprietarioDTO the proprietarioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new proprietarioDTO, or with status 400 (Bad Request) if the proprietario has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/proprietarios")
    public ResponseEntity<ProprietarioDTO> createProprietario(@Valid @RequestBody ProprietarioDTO proprietarioDTO) throws URISyntaxException {
        log.debug("REST request to save Proprietario : {}", proprietarioDTO);
        if (proprietarioDTO.getId() != null) {
            throw new BadRequestAlertException("A new proprietario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProprietarioDTO result = proprietarioService.save(proprietarioDTO);
        return ResponseEntity.created(new URI("/api/proprietarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /proprietarios : Updates an existing proprietario.
     *
     * @param proprietarioDTO the proprietarioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated proprietarioDTO,
     * or with status 400 (Bad Request) if the proprietarioDTO is not valid,
     * or with status 500 (Internal Server Error) if the proprietarioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/proprietarios")
    public ResponseEntity<ProprietarioDTO> updateProprietario(@Valid @RequestBody ProprietarioDTO proprietarioDTO) throws URISyntaxException {
        log.debug("REST request to update Proprietario : {}", proprietarioDTO);
        if (proprietarioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProprietarioDTO result = proprietarioService.save(proprietarioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, proprietarioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /proprietarios : get all the proprietarios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of proprietarios in body
     */
    @GetMapping("/proprietarios")
    public List<ProprietarioDTO> getAllProprietarios() {
        log.debug("REST request to get all Proprietarios");
        return proprietarioService.findAll();
    }

    /**
     * GET  /proprietarios/:id : get the "id" proprietario.
     *
     * @param id the id of the proprietarioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the proprietarioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/proprietarios/{id}")
    public ResponseEntity<ProprietarioDTO> getProprietario(@PathVariable Long id) {
        log.debug("REST request to get Proprietario : {}", id);
        Optional<ProprietarioDTO> proprietarioDTO = proprietarioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(proprietarioDTO);
    }

    /**
     * DELETE  /proprietarios/:id : delete the "id" proprietario.
     *
     * @param id the id of the proprietarioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/proprietarios/{id}")
    public ResponseEntity<Void> deleteProprietario(@PathVariable Long id) {
        log.debug("REST request to delete Proprietario : {}", id);
        proprietarioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
