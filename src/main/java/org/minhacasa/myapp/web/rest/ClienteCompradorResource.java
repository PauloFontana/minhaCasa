package org.minhacasa.myapp.web.rest;
import org.minhacasa.myapp.domain.ClienteComprador;
import org.minhacasa.myapp.repository.ClienteCompradorRepository;
import org.minhacasa.myapp.web.rest.errors.BadRequestAlertException;
import org.minhacasa.myapp.web.rest.util.HeaderUtil;
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
 * REST controller for managing ClienteComprador.
 */
@RestController
@RequestMapping("/api")
public class ClienteCompradorResource {

    private final Logger log = LoggerFactory.getLogger(ClienteCompradorResource.class);

    private static final String ENTITY_NAME = "clienteComprador";

    private final ClienteCompradorRepository clienteCompradorRepository;

    public ClienteCompradorResource(ClienteCompradorRepository clienteCompradorRepository) {
        this.clienteCompradorRepository = clienteCompradorRepository;
    }

    /**
     * POST  /cliente-compradors : Create a new clienteComprador.
     *
     * @param clienteComprador the clienteComprador to create
     * @return the ResponseEntity with status 201 (Created) and with body the new clienteComprador, or with status 400 (Bad Request) if the clienteComprador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cliente-compradors")
    public ResponseEntity<ClienteComprador> createClienteComprador(@RequestBody ClienteComprador clienteComprador) throws URISyntaxException {
        log.debug("REST request to save ClienteComprador : {}", clienteComprador);
        if (clienteComprador.getId() != null) {
            throw new BadRequestAlertException("A new clienteComprador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClienteComprador result = clienteCompradorRepository.save(clienteComprador);
        return ResponseEntity.created(new URI("/api/cliente-compradors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cliente-compradors : Updates an existing clienteComprador.
     *
     * @param clienteComprador the clienteComprador to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated clienteComprador,
     * or with status 400 (Bad Request) if the clienteComprador is not valid,
     * or with status 500 (Internal Server Error) if the clienteComprador couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cliente-compradors")
    public ResponseEntity<ClienteComprador> updateClienteComprador(@RequestBody ClienteComprador clienteComprador) throws URISyntaxException {
        log.debug("REST request to update ClienteComprador : {}", clienteComprador);
        if (clienteComprador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClienteComprador result = clienteCompradorRepository.save(clienteComprador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, clienteComprador.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cliente-compradors : get all the clienteCompradors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of clienteCompradors in body
     */
    @GetMapping("/cliente-compradors")
    public List<ClienteComprador> getAllClienteCompradors() {
        log.debug("REST request to get all ClienteCompradors");
        return clienteCompradorRepository.findAll();
    }

    /**
     * GET  /cliente-compradors/:id : get the "id" clienteComprador.
     *
     * @param id the id of the clienteComprador to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the clienteComprador, or with status 404 (Not Found)
     */
    @GetMapping("/cliente-compradors/{id}")
    public ResponseEntity<ClienteComprador> getClienteComprador(@PathVariable Long id) {
        log.debug("REST request to get ClienteComprador : {}", id);
        Optional<ClienteComprador> clienteComprador = clienteCompradorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(clienteComprador);
    }

    /**
     * DELETE  /cliente-compradors/:id : delete the "id" clienteComprador.
     *
     * @param id the id of the clienteComprador to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cliente-compradors/{id}")
    public ResponseEntity<Void> deleteClienteComprador(@PathVariable Long id) {
        log.debug("REST request to delete ClienteComprador : {}", id);
        clienteCompradorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
