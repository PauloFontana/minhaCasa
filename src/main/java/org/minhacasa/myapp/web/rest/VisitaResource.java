package org.minhacasa.myapp.web.rest;
import org.minhacasa.myapp.service.VisitaService;
import org.minhacasa.myapp.web.rest.errors.BadRequestAlertException;
import org.minhacasa.myapp.web.rest.util.HeaderUtil;
import org.minhacasa.myapp.web.rest.util.PaginationUtil;
import org.minhacasa.myapp.service.dto.VisitaDTO;
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
 * REST controller for managing Visita.
 */
@RestController
@RequestMapping("/api")
public class VisitaResource {

    private final Logger log = LoggerFactory.getLogger(VisitaResource.class);

    private static final String ENTITY_NAME = "visita";

    private final VisitaService visitaService;

    public VisitaResource(VisitaService visitaService) {
        this.visitaService = visitaService;
    }

    /**
     * POST  /visitas : Create a new visita.
     *
     * @param visitaDTO the visitaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new visitaDTO, or with status 400 (Bad Request) if the visita has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/visitas")
    public ResponseEntity<VisitaDTO> createVisita(@RequestBody VisitaDTO visitaDTO) throws URISyntaxException {
        log.debug("REST request to save Visita : {}", visitaDTO);
        if (visitaDTO.getId() != null) {
            throw new BadRequestAlertException("A new visita cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VisitaDTO result = visitaService.save(visitaDTO);
        return ResponseEntity.created(new URI("/api/visitas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /visitas : Updates an existing visita.
     *
     * @param visitaDTO the visitaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated visitaDTO,
     * or with status 400 (Bad Request) if the visitaDTO is not valid,
     * or with status 500 (Internal Server Error) if the visitaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/visitas")
    public ResponseEntity<VisitaDTO> updateVisita(@RequestBody VisitaDTO visitaDTO) throws URISyntaxException {
        log.debug("REST request to update Visita : {}", visitaDTO);
        if (visitaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VisitaDTO result = visitaService.save(visitaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, visitaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /visitas : get all the visitas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of visitas in body
     */
    @GetMapping("/visitas")
    public ResponseEntity<List<VisitaDTO>> getAllVisitas(Pageable pageable) {
        log.debug("REST request to get a page of Visitas");
        Page<VisitaDTO> page = visitaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/visitas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /visitas/:id : get the "id" visita.
     *
     * @param id the id of the visitaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the visitaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/visitas/{id}")
    public ResponseEntity<VisitaDTO> getVisita(@PathVariable Long id) {
        log.debug("REST request to get Visita : {}", id);
        Optional<VisitaDTO> visitaDTO = visitaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(visitaDTO);
    }

    /**
     * DELETE  /visitas/:id : delete the "id" visita.
     *
     * @param id the id of the visitaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/visitas/{id}")
    public ResponseEntity<Void> deleteVisita(@PathVariable Long id) {
        log.debug("REST request to delete Visita : {}", id);
        visitaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
