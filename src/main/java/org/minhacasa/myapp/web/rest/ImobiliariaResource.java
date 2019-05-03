package org.minhacasa.myapp.web.rest;
import org.minhacasa.myapp.service.ImobiliariaService;
import org.minhacasa.myapp.web.rest.errors.BadRequestAlertException;
import org.minhacasa.myapp.web.rest.util.HeaderUtil;
import org.minhacasa.myapp.service.dto.ImobiliariaDTO;
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
 * REST controller for managing Imobiliaria.
 */
@RestController
@RequestMapping("/api")
public class ImobiliariaResource {

    private final Logger log = LoggerFactory.getLogger(ImobiliariaResource.class);

    private static final String ENTITY_NAME = "imobiliaria";

    private final ImobiliariaService imobiliariaService;

    public ImobiliariaResource(ImobiliariaService imobiliariaService) {
        this.imobiliariaService = imobiliariaService;
    }

    /**
     * POST  /imobiliarias : Create a new imobiliaria.
     *
     * @param imobiliariaDTO the imobiliariaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imobiliariaDTO, or with status 400 (Bad Request) if the imobiliaria has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/imobiliarias")
    public ResponseEntity<ImobiliariaDTO> createImobiliaria(@Valid @RequestBody ImobiliariaDTO imobiliariaDTO) throws URISyntaxException {
        log.debug("REST request to save Imobiliaria : {}", imobiliariaDTO);
        if (imobiliariaDTO.getId() != null) {
            throw new BadRequestAlertException("A new imobiliaria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ImobiliariaDTO result = imobiliariaService.save(imobiliariaDTO);
        return ResponseEntity.created(new URI("/api/imobiliarias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /imobiliarias : Updates an existing imobiliaria.
     *
     * @param imobiliariaDTO the imobiliariaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imobiliariaDTO,
     * or with status 400 (Bad Request) if the imobiliariaDTO is not valid,
     * or with status 500 (Internal Server Error) if the imobiliariaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/imobiliarias")
    public ResponseEntity<ImobiliariaDTO> updateImobiliaria(@Valid @RequestBody ImobiliariaDTO imobiliariaDTO) throws URISyntaxException {
        log.debug("REST request to update Imobiliaria : {}", imobiliariaDTO);
        if (imobiliariaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ImobiliariaDTO result = imobiliariaService.save(imobiliariaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imobiliariaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /imobiliarias : get all the imobiliarias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of imobiliarias in body
     */
    @GetMapping("/imobiliarias")
    public List<ImobiliariaDTO> getAllImobiliarias() {
        log.debug("REST request to get all Imobiliarias");
        return imobiliariaService.findAll();
    }

    /**
     * GET  /imobiliarias/:id : get the "id" imobiliaria.
     *
     * @param id the id of the imobiliariaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imobiliariaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/imobiliarias/{id}")
    public ResponseEntity<ImobiliariaDTO> getImobiliaria(@PathVariable Long id) {
        log.debug("REST request to get Imobiliaria : {}", id);
        Optional<ImobiliariaDTO> imobiliariaDTO = imobiliariaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(imobiliariaDTO);
    }

    /**
     * DELETE  /imobiliarias/:id : delete the "id" imobiliaria.
     *
     * @param id the id of the imobiliariaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/imobiliarias/{id}")
    public ResponseEntity<Void> deleteImobiliaria(@PathVariable Long id) {
        log.debug("REST request to delete Imobiliaria : {}", id);
        imobiliariaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
